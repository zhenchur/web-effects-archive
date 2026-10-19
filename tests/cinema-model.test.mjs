import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { loadTypeScript } from './load-typescript.mjs';

const modelUrl = new URL('../effects/cinema-letters/model.ts', import.meta.url);
const fixture = JSON.parse(await readFile(new URL('./fixtures/cinema-scene.json', import.meta.url), 'utf8'));
const { CINEMA_MODEL, cinemaEase, sampleCinemaPose, sampleCinemaPhase, cinemaTransform } = await loadTypeScript(modelUrl);
const close = (actual, expected, tolerance = 1e-10) => assert.ok(
  Math.abs(actual - expected) <= tolerance, `${actual} differs from ${expected} by more than ${tolerance}`,
);

test('the approved C4D model is unchanged during extraction', async () => {
  const source = (await readFile(modelUrl, 'utf8')).replace(/\r\n/g, '\n');
  assert.equal(createHash('sha256').update(source).digest('hex'), fixture.modelSha256);
  assert.equal(CINEMA_MODEL.planeWidth, fixture.plane.width);
  assert.equal(CINEMA_MODEL.planeHeight, fixture.plane.height);
  assert.equal(CINEMA_MODEL.depth, fixture.plane.depth);
  assert.equal(CINEMA_MODEL.cameraDistance, fixture.plane.cameraDistance);
  close(CINEMA_MODEL.depthRatio, fixture.plane.depth / fixture.plane.height);
  close(CINEMA_MODEL.cameraDistanceToHeight, fixture.plane.cameraDistance / fixture.plane.height);
});

test('arrival and departure agree with captured C4D angles', () => {
  for (const expected of fixture.samples) {
    const actual = sampleCinemaPose(expected.frame);
    for (const angle of ['pitch', 'parentBank', 'childBank']) close(actual[angle], expected[angle], .2);
    const incoming = expected.frame <= 30;
    assert.deepEqual(sampleCinemaPhase(incoming ? 'incoming' : 'outgoing', (expected.frame % 30 || (expected.frame ? 30 : 0)) / 30), actual);
  }
});

test('curve is monotonic, symmetric and reaches exact endpoint poses', () => {
  assert.deepEqual([cinemaEase(0), cinemaEase(.5), cinemaEase(1)], [0, .5, 1]);
  assert.deepEqual([sampleCinemaPose(0).pitch, sampleCinemaPose(30).pitch, sampleCinemaPose(60).pitch], [-90, 0, 90]);
  let previous = -1;
  for (let i = 0; i <= 1000; i++) {
    const progress = i / 1000;
    const eased = cinemaEase(progress);
    assert.ok(eased >= previous);
    close(eased + cinemaEase(1 - progress), 1, 1e-9);
    const incoming = sampleCinemaPhase('incoming', progress);
    const outgoing = sampleCinemaPhase('outgoing', 1 - progress);
    close(incoming.pitch, -outgoing.pitch, 1e-8);
    close(incoming.parentBank, outgoing.parentBank, 1e-8);
    previous = eased;
  }
});

test('reverse seeking is deterministic and invalid progress is bounded', () => {
  const frames = Array.from({ length: 241 }, (_, index) => index / 4);
  const forward = frames.map(sampleCinemaPose);
  frames.reverse().forEach((frame, index) => assert.deepEqual(sampleCinemaPose(frame), forward.at(-1 - index)));
  assert.deepEqual(sampleCinemaPose(-10), sampleCinemaPose(0));
  assert.deepEqual(sampleCinemaPose(100), sampleCinemaPose(60));
  assert.deepEqual(sampleCinemaPose(NaN), sampleCinemaPose(0));
  assert.equal(cinemaEase(Infinity), 0);
});

// An independent vector evaluator uses the emitted transform string. This
// catches reordering the two banks around pitch, or moving the pivot forward.
function applyTransform(transform, point) {
  return [...transform.matchAll(/(translateZ|rotateZ|rotateX)\(([-\d.e+]+)(px|deg)\)/g)]
    .reverse().reduce(([x, y, z], [, operation, raw]) => {
      const amount = Number(raw);
      if (operation === 'translateZ') return [x, y, z + amount];
      const radians = amount * Math.PI / 180;
      const c = Math.cos(radians), s = Math.sin(radians);
      return operation === 'rotateZ' ? [x * c - y * s, x * s + y * c, z] : [x, y * c - z * s, y * s + z * c];
    }, point);
}
const subtract = (a, b) => a.map((value, index) => value - b[index]);
const cssAxes = ([x, y, z]) => [x, -y, -z];

test('transform hierarchy and pivot match the captured scene world matrix', () => {
  const transform = cinemaTransform(sampleCinemaPose(0), fixture.plane.depth);
  const center = applyTransform(transform, [0, 0, 0]);
  const matrix = fixture.frameZeroWorldMatrix;
  const expectations = [
    [center, cssAxes(matrix.off)],
    [subtract(applyTransform(transform, [1, 0, 0]), center), cssAxes(matrix.v1)],
    [subtract(applyTransform(transform, [0, 1, 0]), center), cssAxes(matrix.v3).map(value => -value)],
    [subtract(applyTransform(transform, [0, 0, 1]), center), cssAxes(matrix.v2)],
  ];
  for (const [actual, expected] of expectations) actual.forEach((value, index) => close(value, expected[index]));
});

test('the plane remains rigid and the frontal pose has no translation or roll', () => {
  const points = [[0, 0, 0], [400, 0, 0], [0, fixture.plane.height, 0]];
  for (let frame = 0; frame <= 60; frame += .5) {
    const transform = cinemaTransform(sampleCinemaPose(frame), fixture.plane.depth);
    const [origin, x, y] = points.map(point => applyTransform(transform, point));
    const dx = subtract(x, origin), dy = subtract(y, origin);
    close(Math.hypot(...dx), 400);
    close(Math.hypot(...dy), fixture.plane.height);
    close(dx.reduce((sum, value, index) => sum + value * dy[index], 0), 0, 1e-9);
  }
  const frontal = cinemaTransform(sampleCinemaPose(30), fixture.plane.depth);
  for (const point of points) applyTransform(frontal, point).forEach((value, index) => close(value, point[index]));
});
