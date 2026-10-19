import assert from 'node:assert/strict';
import test from 'node:test';
import { loadTypeScript } from './load-typescript.mjs';

const { splitLetters, getLetterTiming } = await loadTypeScript(new URL('../effects/cinema-letters/letters.ts', import.meta.url));
// Only this in-memory copy exposes the private fade; the public module is intact.
const { faceOpacity, DEFAULT_WORDS } = await loadTypeScript(new URL('../effects/cinema-letters/index.ts', import.meta.url), ['faceOpacity']);
const { sampleCinemaPhase } = await loadTypeScript(new URL('../effects/cinema-letters/model.ts', import.meta.url));
const near = (actual, expected, tolerance = 1e-10) => assert.ok(Math.abs(actual - expected) <= tolerance, `${actual} != ${expected}`);
const timingConfig = (amount = .04, from = 'start') => ({ staggerEnabled: true, staggerAmount: amount, staggerFrom: from });

test('reference word order and glyph counts survive extraction', () => {
  assert.deepEqual(DEFAULT_WORDS, ['Made by', 'Google', 'Gemini', 'Android', 'Pixel']);
  assert.deepEqual(DEFAULT_WORDS.map(word => splitLetters(word).length), [6, 6, 6, 7, 5]);
});

test('glyph ranges retain whitespace and UTF-16 offsets for actual text measurement', () => {
  const label = 'A 😀 Б';
  assert.deepEqual(splitLetters(label), [
    { text: 'A', start: 0, end: 1 },
    { text: '😀', start: 2, end: 4 },
    { text: 'Б', start: 5, end: 6 },
  ]);
  for (const letter of splitLetters(label)) assert.equal(label.slice(letter.start, letter.end), letter.text);
  assert.deepEqual(splitLetters(' \n\t'), []);
});

test('stagger delays are normalized into one step and direction mirrors rank', () => {
  for (const count of [2, 5, 7, 50]) for (const amount of [0, .04, .16, .5]) {
    const forward = Array.from({ length: count }, (_, index) => getLetterTiming(index, count, timingConfig(amount)));
    const backward = Array.from({ length: count }, (_, index) => getLetterTiming(index, count, timingConfig(amount, 'end')));
    assert.deepEqual(forward, backward.reverse());
    near(forward[0].offset, 0);
    near(forward.at(-1).offset + forward.at(-1).duration, 1);
    for (const timing of forward) {
      near(timing.duration, 1 - amount);
      assert.ok(timing.offset >= 0 && timing.offset + timing.duration <= 1 + Number.EPSILON);
    }
  }
});

test('disabled stagger and one glyph retain whole-word timing', () => {
  for (const count of [0, 1, 7]) for (let index = 0; index < Math.max(1, count); index++) {
    assert.deepEqual(getLetterTiming(index, count, { ...timingConfig(.5), staggerEnabled: false }), { offset: 0, duration: 1 });
  }
  assert.deepEqual(getLetterTiming(0, 1, timingConfig(.5)), { offset: 0, duration: 1 });
  assert.deepEqual(getLetterTiming(6, 7, timingConfig(10)), { offset: .5, duration: .5 });
  assert.deepEqual(getLetterTiming(6, 7, timingConfig(NaN)), { offset: 0, duration: 1 });
});

test('angular fade hides edge-on planes and preserves the readable central face', () => {
  for (const sign of [-1, 1]) {
    assert.equal(faceOpacity({ pitch: 0 }), 1);
    near(faceOpacity({ pitch: sign * 43.2 }), 1);
    near(faceOpacity({ pitch: sign * 58.5 }), .5);
    near(faceOpacity({ pitch: sign * 73.8 }), 0);
    assert.equal(faceOpacity({ pitch: sign * 90 }), 0);
  }
  let previous = 1;
  for (let angle = 0; angle <= 90; angle += .1) {
    const opacity = faceOpacity({ pitch: angle });
    assert.ok(opacity >= 0 && opacity <= 1 && opacity <= previous + 1e-12);
    near(opacity, faceOpacity({ pitch: -angle }));
    previous = opacity;
  }
});

test('arrival and departure fade are reversible at every sampled phase', () => {
  for (let index = 0; index <= 300; index++) {
    const progress = index / 300;
    const arrival = faceOpacity(sampleCinemaPhase('incoming', progress));
    const departure = faceOpacity(sampleCinemaPhase('outgoing', 1 - progress));
    near(arrival, departure, 1e-9);
  }
});
