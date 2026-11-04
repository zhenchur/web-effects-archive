import assert from 'node:assert/strict';
import test from 'node:test';
import { loadTypeScript } from './load-typescript.mjs';

const { clampPosition, sampleFilmCard, projectFilmRelease } = await loadTypeScript(
  new URL('../effects/film-cards/model.ts', import.meta.url),
);

test('every card becomes front-facing and full-sized at its selected index', () => {
  for (const width of [80, 230, 560]) {
    for (let index = 0; index < 7; index++) {
      const pose = sampleFilmCard(index, index, width);
      assert.equal(Math.abs(pose.x), 0);
      assert.equal(Math.abs(pose.z), 0);
      assert.equal(Math.abs(pose.rotationY), 0);
      assert.equal(pose.scale, 1);
      assert.equal(pose.shade, 0);
    }
  }
});

test('left and right cards mirror each other throughout a transition', () => {
  for (let distance = .01; distance <= 5; distance += .013) {
    const left = sampleFilmCard(3 - distance, 3, 500);
    const right = sampleFilmCard(3 + distance, 3, 500);
    for (const key of ['x', 'rotationY']) assert.ok(Math.abs(left[key] + right[key]) < 1e-9);
    for (const key of ['z', 'scale', 'shade']) assert.ok(Math.abs(left[key] - right[key]) < 1e-9);
  }
});

test('scroll poses are reversible, ordered, bounded and continuous at the fold', () => {
  const forward = Array.from({ length: 601 }, (_, index) => sampleFilmCard(3, index / 100, 500));
  for (let index = 600; index >= 0; index--) {
    assert.deepEqual(sampleFilmCard(3, index / 100, 500), forward[index]);
    const pose = forward[index];
    assert.ok(Object.values(pose).every(Number.isFinite));
    assert.ok(pose.scale > 0 && pose.scale <= 1);
    assert.ok(pose.shade >= 0 && pose.shade <= .62);
    if (index) assert.ok(pose.x <= forward[index - 1].x);
  }
  const before = sampleFilmCard(2, 1 - 1e-6, 500);
  const after = sampleFilmCard(2, 1 + 1e-6, 500);
  assert.ok(Math.abs(before.x - after.x) < .001);
  assert.ok(Math.abs(before.rotationY - after.rotationY) < .001);
});

test('departing cards match the observed turn at measured reference displacements', () => {
  // Approximate world-space displacement and turn reconstructed from four
  // frames of the public Motion Gallery Film preview, not model coefficients.
  const reference = [
    { xRatio: -.235, turn: 10.4 },
    { xRatio: -.54, turn: 30.1 },
    { xRatio: -.732, turn: 49.5 },
    { xRatio: -.799, turn: 58.2 },
  ];
  for (const width of [230, 560]) {
    for (const { xRatio, turn } of reference) {
      // One selected-to-side transition spans .82 card widths in the preview.
      const position = -xRatio / .82;
      const pose = sampleFilmCard(0, position, width);
      assert.ok(Math.abs(Math.abs(pose.rotationY) - turn) <= 4,
        `at x/width=${xRatio}, expected turn near ${turn}°, received ${pose.rotationY}°`);
    }
  }
});

test('folded cards slide along either side row without further turning or receding', () => {
  for (const direction of [-1, 1]) {
    const positions = [1, 1.25, 1.8, 2.5, 3].map(distance => 3 + direction * distance);
    const poses = positions.map(position => sampleFilmCard(3, position, 500));
    for (let index = 1; index < poses.length; index++) {
      for (const key of ['z', 'scale', 'rotationY', 'shade']) {
        assert.equal(poses[index][key], poses[0][key], `${key} stays fixed in the side row`);
      }
      assert.ok(direction * (poses[index].x - poses[index - 1].x) < 0,
        'each later frame moves farther along the row');
    }
    for (let index = positions.length - 1; index >= 0; index--) {
      assert.deepEqual(sampleFilmCard(3, positions[index], 500), poses[index],
        'returning along the row restores the same pose');
    }
  }
});

test('release handles flick direction, stale velocity, edges and a one-card deck', () => {
  assert.equal(projectFilmRelease(2.1, .004, 7), 3);
  assert.equal(projectFilmRelease(2.9, -.004, 7), 2);
  assert.equal(projectFilmRelease(2.1, 0, 7), 2);
  assert.equal(projectFilmRelease(0, -100, 7), 0);
  assert.equal(projectFilmRelease(6, 100, 7), 6);
  assert.equal(projectFilmRelease(3, 100, 7), 5);
  assert.equal(projectFilmRelease(0, 100, 1), 0);
  assert.equal(projectFilmRelease(2.1, NaN, 7), 2);
  assert.equal(clampPosition(NaN, 7), 0);
  assert.equal(clampPosition(-Infinity, 7), 0);
  assert.equal(clampPosition(Infinity, 7), 6);
});
