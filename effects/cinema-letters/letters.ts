export type CinemaLetter = { text: string; start: number; end: number };

/** Preserve the source effect's Unicode code-point splitting and UTF-16 ranges. */
export function splitLetters(label: string): CinemaLetter[] {
  const letters: CinemaLetter[] = [];
  let start = 0;
  for (const text of label) {
    const end = start + text.length;
    if (!/\s/u.test(text)) letters.push({ text, start, end });
    start = end;
  }
  return letters;
}

export type LetterTimingOptions = {
  staggerEnabled: boolean;
  staggerAmount: number;
  staggerFrom: 'start' | 'end';
};

export function getLetterTiming(index: number, count: number, config: LetterTimingOptions) {
  if (!config.staggerEnabled || count <= 1) return { offset: 0, duration: 1 };
  const spread = Number.isFinite(config.staggerAmount) ? Math.min(.5, Math.max(0, config.staggerAmount)) : 0;
  const position = Math.min(count - 1, Math.max(0, index));
  const order = config.staggerFrom === 'end' ? count - 1 - position : position;
  return { offset: spread * order / (count - 1), duration: 1 - spread };
}

const typographyProperties = [
  'font-family', 'font-size', 'font-style', 'font-weight', 'font-stretch',
  'font-kerning', 'font-feature-settings', 'font-variation-settings', 'font-optical-sizing',
  'font-variant', 'font-synthesis', 'letter-spacing', 'word-spacing', 'line-height',
  'text-transform', 'text-rendering', 'direction',
];

/** Measure whole words outside the animated ancestry, keeping kerning intact. */
export function measureLetters(effect: HTMLElement, measurementRoot: HTMLElement) {
  const document = effect.ownerDocument;
  const view = document.defaultView;
  if (!view) return;

  const probes = Array.from(effect.querySelectorAll<HTMLElement>('.cl-measure')).map((measure) => {
    const item = measure.parentElement;
    const probe = document.createElement('span');
    const computed = view.getComputedStyle(measure);
    for (const property of typographyProperties) probe.style.setProperty(property, computed.getPropertyValue(property));
    Object.assign(probe.style, {
      position: 'fixed', left: '-10000px', top: '0', display: 'block', width: 'max-content',
      whiteSpace: 'pre', visibility: 'hidden', pointerEvents: 'none', margin: '0', padding: '0', border: '0',
    });
    probe.setAttribute('aria-hidden', 'true');
    probe.textContent = measure.textContent;
    return { item, probe };
  });
  const fragment = document.createDocumentFragment();
  probes.forEach(({ probe }) => fragment.append(probe));
  measurementRoot.append(fragment);

  try {
    const measurements = probes.map(({ item, probe }) => {
      const bounds = probe.getBoundingClientRect();
      const text = probe.firstChild;
      const range = document.createRange();
      const letters = item ? Array.from(item.querySelectorAll<HTMLElement>('[data-letter-start]')) : [];
      const offsets = letters.map((letter) => {
        const start = Number(letter.dataset.letterStart);
        const end = Number(letter.dataset.letterEnd);
        if (!text || !Number.isInteger(start) || !Number.isInteger(end) || start < 0 || end > (text.textContent?.length ?? 0)) return null;
        range.setStart(text, start);
        range.setEnd(text, end);
        return { letter, left: range.getBoundingClientRect().left - bounds.left };
      });
      return { item, width: bounds.width, offsets };
    });
    measurements.forEach(({ item, width, offsets }) => {
      if (!item || width <= 0) return;
      item.style.setProperty('--cl-word-width', `${width}px`);
      offsets.forEach((offset) => {
        if (offset) offset.letter.style.setProperty('--cl-letter-x', `${offset.left}px`);
      });
    });
  } finally {
    probes.forEach(({ probe }) => probe.remove());
  }
}
