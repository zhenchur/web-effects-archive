import assert from 'node:assert/strict';
import test from 'node:test';
import { loadTypeScript } from './load-typescript.mjs';

const { createDrumLayout, sampleDrumLine } = await loadTypeScript(
  new URL('../effects/fresh-content/model.ts', import.meta.url),
);

const close = (actual, expected, tolerance = 1e-9) => assert.ok(
  Math.abs(actual - expected) <= tolerance,
  `${actual} differs from ${expected} by more than ${tolerance}`,
);

test('every word reaches full size at the viewport center, including both endpoints', () => {
  const layout = createDrumLayout({ height: 900, fontSize: 192, lineCount: 21 });
  for (let index = 0; index < layout.lineCount; index++) {
    const row = sampleDrumLine(layout, index, index / (layout.lineCount - 1));
    close(row.y, 450);
    close(row.scale, 1);
    assert.equal(row.opacity, 1);
    assert.equal(row.visible, true);
  }
  const single = createDrumLayout({ height: 500, fontSize: 90, lineCount: 1 });
  assert.deepEqual(sampleDrumLine(single, 0, 0), sampleDrumLine(single, 0, 1));
});

test('forward scrolling moves a word upward, growing below center and shrinking above it', () => {
  const layout = createDrumLayout({ height: 900, fontSize: 192, lineCount: 21 });
  let previous = sampleDrumLine(layout, 10, 0);
  for (let tick = 1; tick <= 1000; tick++) {
    const row = sampleDrumLine(layout, 10, tick / 1000);
    assert.ok(row.y <= previous.y);
    assert.ok(row.scale >= 0 && row.scale <= 1);
    assert.ok(row.opacity >= 0 && row.opacity <= 1);
    if (tick <= 500) assert.ok(row.scale >= previous.scale);
    else assert.ok(row.scale <= previous.scale);
    previous = row;
  }
  for (let tick = 0; tick <= 500; tick++) {
    const lower = sampleDrumLine(layout, 10, tick / 1000);
    const upper = sampleDrumLine(layout, 10, 1 - tick / 1000);
    close(lower.y + upper.y, layout.height);
    close(lower.scale, upper.scale);
    close(lower.opacity, upper.opacity);
  }
});

test('line boxes meet exactly at .9em without added gaps, including fractional progress and short heights', () => {
  const defaults = createDrumLayout({ height: 900, fontSize: 144, lineCount: 21 });
  assert.equal(defaults.lineHeight, 0.9);
  assert.equal(defaults.gap, 0);
  const sizes = [
    { height: 1080, fontSize: 210 },
    { height: 844, fontSize: 80 },
    { height: 390, fontSize: 80 },
    { height: 240, fontSize: 210 },
    { height: 1, fontSize: 1 },
  ];
  for (const size of sizes) {
    for (const gap of [0, 0.1, 0.3]) {
      for (const focus of [0.25, 0.5, 0.7]) {
        const layout = createDrumLayout({ ...size, gap, lineCount: 31, focusY: size.height * focus });
        for (let tick = 0; tick <= 720; tick++) {
          const rows = Array.from({ length: layout.lineCount }, (_, index) =>
            sampleDrumLine(layout, index, tick / 720));
          for (let index = 1; index < rows.length; index++) {
            const before = rows[index - 1];
            const after = rows[index];
            assert.ok(after.y >= before.y);
            const halfHeight = size.fontSize * layout.lineHeight / 2;
            const space = after.y - before.y - halfHeight * (before.scale + after.scale);
            const requestedGap = halfHeight * gap * (before.scale + after.scale);
            close(space, requestedGap, 1e-9);
          }
        }
      }
    }
  }
});

test('reverse scrolling and arbitrary seeking reproduce identical poses without accumulated state', () => {
  const layout = createDrumLayout({ height: 900, fontSize: 192, lineCount: 21 });
  const positions = [0, 0.05, 0.173, 0.499, 0.5, 0.725, 0.993, 1];
  const snapshots = positions.map(progress => Array.from({ length: layout.lineCount }, (_, index) =>
    sampleDrumLine(layout, index, progress)));
  for (const progress of [...positions].reverse()) {
    const actual = Array.from({ length: layout.lineCount }, (_, index) => sampleDrumLine(layout, index, progress));
    assert.deepEqual(actual, snapshots[positions.indexOf(progress)]);
  }
  assert.ok(Object.isFrozen(layout));
});

test('rows cross both viewport boundaries at full opacity and a readable font size before clipping', () => {
  const layout = createDrumLayout({ height: 900, fontSize: 144, lineCount: 101 });
  let crossesTop = false;
  let crossesBottom = false;
  for (let tick = 0; tick <= 10000; tick++) {
    const row = sampleDrumLine(layout, 50, tick / 10000);
    const halfHeight = layout.fontSize * layout.lineHeight * row.scale / 2;
    const top = row.y - halfHeight;
    const bottom = row.y + halfHeight;
    assert.equal(row.opacity, 1);
    assert.ok(row.scale >= layout.minScale);
    assert.equal(row.visible, bottom > 0 && top < layout.height);
    if (row.y < 0 && bottom > 0) crossesTop = true;
    if (row.y > layout.height && top < layout.height) crossesBottom = true;
  }
  assert.ok(crossesTop);
  assert.ok(crossesBottom);
  assert.equal(sampleDrumLine(layout, 50, 0).visible, false);
  assert.equal(sampleDrumLine(layout, 50, 1).visible, false);
});

test('custom focus is smooth and introduces no change in vertical speed or peak size', () => {
  const layout = createDrumLayout({ height: 748, focusY: 298, fontSize: 160, lineCount: 21 });
  const center = sampleDrumLine(layout, 10, 0.5);
  const before = sampleDrumLine(layout, 10, 0.5 - 1e-7);
  const after = sampleDrumLine(layout, 10, 0.5 + 1e-7);
  close(center.y, 298);
  close(center.scale, 1);
  close(before.y - center.y, center.y - after.y, 1e-9);
  close(before.scale, after.scale);
  assert.ok(1 - before.scale < 1e-10);
});

test('desktop and mobile have the same stage-relative lens profile instead of long minimum-size tails', () => {
  const layouts = [
    createDrumLayout({ height: 900, fontSize: 144, lineCount: 201 }),
    createDrumLayout({ height: 844, fontSize: 44, lineCount: 201 }),
  ];
  for (const fraction of [0.1, 0.2, 0.3, 0.4, 0.5]) {
    const ratios = layouts.map(layout => {
      let low = 0;
      let high = 0.5;
      const target = layout.height * (0.5 + fraction);
      for (let step = 0; step < 60; step++) {
        const progress = (low + high) / 2;
        if (sampleDrumLine(layout, 100, progress).y > target) low = progress;
        else high = progress;
      }
      const row = sampleDrumLine(layout, 100, (low + high) / 2);
      close(row.y, target, 1e-8);
      assert.ok(row.scale > layout.minScale + 0.03);
      return row.scale;
    });
    close(ratios[0], ratios[1], 0.015);
  }
});

test('invalid dimensions, row indices and progress remain bounded and finite', () => {
  for (const value of [NaN, Infinity, -Infinity, -100, 0, Number.MAX_VALUE]) {
    const layout = createDrumLayout({
      height: value, fontSize: value, lineCount: value,
      focusY: value, lineHeight: value, gap: value, minScale: value, spread: value,
    });
    assert.ok(Object.values(layout).every(Number.isFinite));
    const row = sampleDrumLine(layout, 0, value);
    assert.ok(Number.isFinite(row.y));
    assert.ok(row.scale >= 0 && row.scale <= 1);
    assert.ok(row.opacity >= 0 && row.opacity <= 1);
  }
  const layout = createDrumLayout({ height: 900, fontSize: 192, lineCount: 21 });
  for (const index of [NaN, Infinity, -1, 21, 0.5]) {
    const row = sampleDrumLine(layout, index, 0.5);
    assert.equal(row.visible, false);
    assert.equal(row.scale, 0);
  }
  assert.deepEqual(sampleDrumLine(layout, 10, -1), sampleDrumLine(layout, 10, 0));
  assert.deepEqual(sampleDrumLine(layout, 10, 2), sampleDrumLine(layout, 10, 1));
  assert.deepEqual(sampleDrumLine(layout, 10, NaN), sampleDrumLine(layout, 10, 0));
});
