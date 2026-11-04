import assert from 'node:assert/strict';
import test from 'node:test';
import { loadTypeScript } from './load-typescript.mjs';

const { clampPosition, sampleFilmCard, projectFilmRelease } = await loadTypeScript(
  new URL('../effects/film-cards/model.ts', import.meta.url),
);

// Frozen pre-optimization geometry. Keep independent of the model's constants
// so rendering optimizations cannot silently alter the approved motion.
function previousFilmPose(index, position, width) {
  const distance = index - position;
  const absolute = Math.abs(distance);
  const side = Math.sign(distance);
  const travel = Math.min(absolute, 1);
  const offset = absolute * .27 + (.82 - .27) * Math.sin(travel * Math.PI / 2);
  return {
    x: side * width * offset,
    z: -width * travel * .6,
    rotationY: -side * travel * 60,
    scale: 1,
    shade: travel * .18,
    zIndex: 1000 - Math.round(absolute * 100),
  };
}

test('optimized poses preserve the previous formula exactly across dense scroll positions', () => {
  for (const width of [80, 230, 414, 560.25]) {
    for (const index of [0, 3, 6]) {
      for (let tick = -2000; tick <= 8000; tick++) {
        const position = tick / 1000;
        assert.deepEqual(sampleFilmCard(index, position, width), previousFilmPose(index, position, width));
      }
    }
  }
  for (const distance of [0, -0, .5, -.5, 1 - Number.EPSILON, 1, 1 + Number.EPSILON, -1, -2, 2]) {
    for (const width of [0, -0, 414]) {
      assert.deepEqual(sampleFilmCard(distance, 0, width), previousFilmPose(distance, 0, width));
    }
  }
});

test('one output pose can be reused across both sides, the center, resizes and reverse seeks', () => {
  const output = { x: NaN, z: NaN, rotationY: NaN, scale: NaN, shade: NaN, zIndex: NaN };
  const positions = [-2, 0, 2, 2.125, 2.5, 2.999, 3, 3.001, 3.5, 3.875, 4, 6, 8];
  for (const width of [414, 80, 560.25]) {
    for (const position of [...positions, ...positions.toReversed()]) {
      const result = sampleFilmCard(3, position, width, output);
      assert.equal(result, output, 'the provided object is returned, not replaced');
      assert.deepEqual(result, previousFilmPose(3, position, width));
    }
  }
  // Fields that are currently constant must also overwrite a stale caller value.
  for (const key of Object.keys(output)) output[key] = -12345;
  assert.equal(sampleFilmCard(3, 3, 414, output), output);
  assert.deepEqual(output, previousFilmPose(3, 3, 414));
  const first = sampleFilmCard(3, 3, 414);
  const second = sampleFilmCard(3, 3, 414);
  assert.notEqual(first, second, 'the original three-argument API still returns a fresh object');
  assert.notEqual(first, output);
});

test('a deck evaluates sine only for its two moving central cards', () => {
  const originalSine = Math.sin;
  let sineCalls = 0;
  Math.sin = value => { sineCalls++; return originalSine(value); };
  try {
    const output = sampleFilmCard(0, 0, 414);
    for (const position of [0, .01, .5, 1, 3.333, 7.5, 10]) {
      sineCalls = 0;
      for (let index = 0; index < 11; index++) sampleFilmCard(index, position, 414, output);
      assert.equal(sineCalls, Number.isInteger(position) ? 0 : 2);
    }
  } finally {
    Math.sin = originalSine;
  }
});

function projectedHorizontalBounds(pose, width) {
  const perspective = width * 1.65;
  const angle = pose.rotationY * Math.PI / 180;
  const edges = [-width * pose.scale / 2, width * pose.scale / 2].map(localX =>
    perspective * (pose.x + localX * Math.cos(angle))
      / (perspective - pose.z + localX * Math.sin(angle)));
  return { left: Math.min(...edges), right: Math.max(...edges) };
}

function projectedPairGap(outgoing, incoming, width, direction) {
  const outBounds = projectedHorizontalBounds(outgoing, width);
  const inBounds = projectedHorizontalBounds(incoming, width);
  return direction === 1 ? inBounds.left - outBounds.right : outBounds.left - inBounds.right;
}

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

test('both cards match the measured reference poses at actual outgoing displacements', () => {
  // Paired-card measurements from the public preview, constrained by the known
  // perspective (incoming-constrained.csv, frames 27/30/33/34/36/37/39/42).
  // X is relative to front-facing card width. These are observations, not a
  // prescribed relationship between X and the model's fractional index.
  const reference = [
    { time: .45, outX: -.09373, outTurn: 4, inX: .76900, inTurn: 53.5 },
    { time: .50, outX: -.19478, outTurn: 8.75, inX: .72433, inTurn: 49.5 },
    { time: .55, outX: -.32449, outTurn: 15.75, inX: .66670, inTurn: 41.75 },
    { time: .5667, outX: -.37541, outTurn: 19, inX: .64144, inTurn: 38 },
    { time: .60, outX: -.48356, outTurn: 26.25, inX: .55635, inTurn: 33.25 },
    { time: .6167, outX: -.53745, outTurn: 30.5, inX: .50334, inTurn: 28.5 },
    { time: .65, outX: -.61101, outTurn: 37.5, inX: .41008, inTurn: 23 },
    { time: .70, outX: -.67761, outTurn: 44, inX: .29644, inTurn: 17.5 },
  ];
  for (const width of [230, 414, 560]) {
    for (const direction of [-1, 1]) {
      for (const measured of reference) {
        // Find the pose by the measured X; do not assume that index is linear
        // in X or recover it from the angle we are about to verify.
        let low = 0, high = 1;
        for (let iteration = 0; iteration < 50; iteration++) {
          const mid = (low + high) / 2;
          const pose = sampleFilmCard(3, 3 + direction * mid, width);
          if (Math.abs(pose.x / width) < Math.abs(measured.outX)) low = mid;
          else high = mid;
        }
        const position = 3 + direction * (low + high) / 2;
        const outgoing = sampleFilmCard(3, position, width);
        const incoming = sampleFilmCard(3 + direction, position, width);
        const context = `reference ${measured.time}s, width ${width}, direction ${direction}`;
        assert.ok(Math.abs(outgoing.x / width - direction * measured.outX) < 1e-8, context);
        assert.ok(Math.abs(Math.abs(outgoing.rotationY) - measured.outTurn) <= 4,
          `${context}: outgoing turn ${outgoing.rotationY}° is near ${measured.outTurn}°`);
        assert.ok(Math.abs(Math.abs(incoming.rotationY) - measured.inTurn) <= 4,
          `${context}: incoming turn ${incoming.rotationY}° is near ${measured.inTurn}°`);
        assert.ok(Math.abs(incoming.x / width - direction * measured.inX) <= .04,
          `${context}: incoming x/width ${incoming.x / width} is near ${direction * measured.inX}`);
      }
    }
  }
});

test('central cards open the observed projected gap and return to the overlapping side stack', () => {
  for (const width of [230, 414, 560]) {
    for (const direction of [-1, 1]) {
      const sample = progress => {
        const position = 3 + direction * progress;
        const outgoing = sampleFilmCard(3, position, width);
        const incoming = sampleFilmCard(3 + direction, position, width);
        return { outgoing, incoming, gap: projectedPairGap(outgoing, incoming, width, direction) };
      };
      // The measured gap is about 53px in the 414px-card reference. Compare
      // projected edges, not transform X or the distance between card centres.
      const equivalentMidGap = sample(.5).gap * 414 / width;
      assert.ok(Math.abs(equivalentMidGap - 53) <= 8,
        `mid-transition gap at reference scale: ${equivalentMidGap}px`);
      const phases = Array.from({ length: 17 }, (_, index) => .3 + index * .025);
      const forward = phases.map(sample);
      for (let index = phases.length - 1; index >= 0; index--) {
        const backward = sample(phases[index]);
        assert.ok(backward.gap > 0, `central pair must not overlap at progress ${phases[index]}`);
        assert.deepEqual(backward, forward[index], 'reverse seeks restore the same projected separation');
      }
      assert.ok(sample(0).gap < 0, 'initial side stack retains its reference overlap');
      assert.ok(sample(1).gap < 0, 'settled side stack retains its reference overlap');
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
