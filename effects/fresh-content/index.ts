import { gsap } from 'gsap';
import { createDrumLayout, sampleDrumLine, type DrumLayout } from './model';

export const FRESH_CONTENT_LINES = ['Fresh', 'Content', 'from', 'Mexico', 'City', 'to the', 'World'] as const;

export type FreshContentOptions = {
  lines?: readonly string[];
  repetitions?: number;
  /** Omit to follow the operating-system preference. */
  reducedMotion?: boolean;
};

export type FreshContent = {
  setProgress(progress: number): void;
  refresh(): void;
  destroy(): void;
};

/** The host owns the scroll range; this scene renders a deterministic optical drum. */
export function createFreshContent(host: HTMLElement, options: FreshContentOptions = {}): FreshContent {
  const document = host.ownerDocument;
  const view = document.defaultView;
  if (!view) throw new Error('Fresh Content requires a browser document.');
  const suppliedLines = options.lines?.map(line => line.trim()).filter(Boolean);
  const lines = suppliedLines?.length ? suppliedLines : [...FRESH_CONTENT_LINES];
  const repetitions = Number.isFinite(options.repetitions)
    ? Math.max(1, Math.min(12, Math.round(options.repetitions!))) : 3;
  const preference = view.matchMedia('(prefers-reduced-motion: reduce)');
  let progress = 0;
  let disposed = false;
  let layout: DrumLayout | undefined;
  let paddingLines = 0;
  let rows: {
    element: HTMLSpanElement;
    visible: boolean;
    setFontSize: ReturnType<typeof gsap.quickSetter>;
    setTop: ReturnType<typeof gsap.quickSetter>;
  }[] = [];

  const effect = document.createElement('div');
  effect.className = 'fc-effect';
  effect.style.setProperty('--fc-line-count', String(lines.length));
  const stage = document.createElement('div');
  stage.className = 'fc-stage';
  stage.dataset.nodeId = '3799:717';
  const heading = document.createElement('h3');
  heading.className = 'fc-heading';
  heading.lang = 'en';
  heading.dataset.nodeId = '3799:720';
  // Visual padding copies never repeat the phrase for assistive technology.
  heading.setAttribute('aria-label', lines.join(' '));
  stage.append(heading);
  effect.append(stage);
  host.append(effect);

  function setRows(copies: number) {
    if (rows.length === copies * lines.length) return;
    const fragment = document.createDocumentFragment();
    rows = Array.from({ length: copies * lines.length }, (_, index) => {
      const element = document.createElement('span');
      element.className = 'fc-line';
      element.textContent = lines[index % lines.length]!;
      element.setAttribute('aria-hidden', 'true');
      fragment.append(element);
      return {
        element,
        visible: true,
        setFontSize: gsap.quickSetter(element, 'fontSize', 'px'),
        setTop: gsap.quickSetter(element, 'top', 'px'),
      };
    });
    heading.replaceChildren(fragment);
  }

  function render() {
    if (disposed || !layout || effect.dataset.fcMotion !== 'true') return;
    const position = paddingLines + progress * (lines.length * repetitions - 1);
    const bufferedProgress = position / Math.max(1, rows.length - 1);
    for (let index = 0; index < rows.length; index++) {
      const row = rows[index]!;
      const pose = sampleDrumLine(layout, index, bufferedProgress);
      if (!pose.visible) {
        if (row.visible) row.element.style.visibility = 'hidden';
        row.visible = false;
        continue;
      }
      if (!row.visible) row.element.style.visibility = 'visible';
      row.visible = true;
      // Rasterize glyphs at their actual size, rather than resampling a scaled GPU layer.
      const fontSize = layout.fontSize * pose.scale;
      row.setFontSize(fontSize);
      row.setTop(pose.y - fontSize * layout.lineHeight / 2);
    }
  }

  function refresh() {
    if (disposed) return;
    const reduced = options.reducedMotion ?? preference.matches;
    effect.dataset.fcMotion = String(!reduced);
    if (reduced) {
      layout = undefined;
      setRows(1);
      rows.forEach(row => {
        row.element.removeAttribute('style');
        row.visible = true;
      });
      return;
    }

    // All layout reads happen on refresh, never during a scrolling frame.
    const fontSize = parseFloat(view!.getComputedStyle(heading).fontSize) || 44;
    const height = stage.clientHeight;
    if (!height) return;
    const focus = parseFloat(view!.getComputedStyle(effect).getPropertyValue('--fc-focus-y'));
    const edge = Math.min(fontSize * .55, height / 2);
    const focusY = Number.isFinite(focus) ? Math.max(edge, Math.min(height - edge, focus)) : height / 2;
    const geometry = createDrumLayout({ height, focusY, fontSize, lineCount: 1 });
    // The smallest rows must still cover both edges at the first and last frame.
    const paddingCount = Math.ceil(Math.max(focusY, height - focusY)
      / (geometry.pitch * geometry.minScale)) + 2;
    const paddingCopies = Math.max(1, Math.ceil(paddingCount / lines.length));
    paddingLines = paddingCopies * lines.length;
    setRows(repetitions + paddingCopies * 2);
    layout = createDrumLayout({ height, focusY, fontSize, lineCount: rows.length });
    render();
  }

  const resizeObserver = new ResizeObserver(refresh);
  resizeObserver.observe(host);
  preference.addEventListener('change', refresh);
  document.fonts.addEventListener('loadingdone', refresh);
  void document.fonts.ready.then(refresh);
  refresh();

  return {
    setProgress(value) {
      if (disposed) return;
      const next = Number.isNaN(value) ? 0 : Math.max(0, Math.min(1, value));
      if (next === progress) return;
      progress = next;
      render();
    },
    refresh,
    destroy() {
      if (disposed) return;
      disposed = true;
      resizeObserver.disconnect();
      preference.removeEventListener('change', refresh);
      document.fonts.removeEventListener('loadingdone', refresh);
      effect.remove();
    },
  };
}
