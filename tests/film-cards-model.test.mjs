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
