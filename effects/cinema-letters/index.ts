import gsap from 'gsap';
import { CINEMA_MODEL, sampleCinemaPhase, type CinemaPose } from './model';
import { getLetterTiming, measureLetters, splitLetters, type LetterTimingOptions } from './letters';

export type CinemaLettersOptions = {
  words?: string[];
  staggerEnabled?: boolean;
  /** Normalized spread across a transition: 0..0.5, default 0.04. */
  staggerAmount?: number;
  staggerFrom?: 'start' | 'end';
  /** Omit to follow the operating-system preference. */
  reducedMotion?: boolean;
};

export type CinemaLetters = {
  /** Normalized progress across the complete sequence: 0..1. */
  setProgress(progress: number): void;
  update(options: Partial<CinemaLettersOptions>): void;
  /** Remeasure typography after a host layout or font change. */
  refresh(): void;
  destroy(): void;
};

export const DEFAULT_WORDS = ['Made by', 'Google', 'Gemini', 'Android', 'Pixel'] as const;

type Settings = LetterTimingOptions & { words: string[]; reducedMotion: boolean | undefined };
type LetterLayer = {
  offset: number;
  duration: number;
  pose(value: CinemaPose): void;
  opacity(value: number): void;
};
type WordLayer = { item: HTMLElement; letters: LetterLayer[] };

const clamp01 = (value: number) => gsap.utils.clamp(0, 1, value);
const smoothstep = (value: number) => {
  const t = clamp01(value);
  return t * t * (3 - 2 * t);
};
// Same angular fade as the source: hide the edge-on silhouette before 90°.
const faceOpacity = (pose: CinemaPose) => smoothstep((.82 - Math.abs(pose.pitch) / 90) / .34);

function normalize(previous: Settings, update: CinemaLettersOptions): Settings {
  const words = update.words === undefined ? previous.words
    : update.words.filter((word) => typeof word === 'string' && word.trim().length > 0);
  return {
    words: words.length ? [...words] : [...DEFAULT_WORDS],
    staggerEnabled: update.staggerEnabled ?? previous.staggerEnabled,
    staggerAmount: update.staggerAmount === undefined || !Number.isFinite(update.staggerAmount)
      ? previous.staggerAmount : gsap.utils.clamp(0, .5, update.staggerAmount),
    staggerFrom: update.staggerFrom === 'start' || update.staggerFrom === 'end'
      ? update.staggerFrom : previous.staggerFrom,
    reducedMotion: Object.prototype.hasOwnProperty.call(update, 'reducedMotion')
      ? update.reducedMotion : previous.reducedMotion,
  };
}

/** A self-contained scene. The host owns scrolling, positioning and its dimensions. */
export function createCinemaLetters(root: HTMLElement, options: CinemaLettersOptions = {}): CinemaLetters {
  const document = root.ownerDocument;
  const view = document.defaultView;
  if (!view) throw new Error('Cinema Letters requires a browser document.');

  let settings = normalize({
    words: [...DEFAULT_WORDS], staggerEnabled: true, staggerAmount: .04,
    staggerFrom: 'start', reducedMotion: undefined,
  }, options);
  let progress = 0;
  let destroyed = false;
  let refreshFrame = 0;
  let context: gsap.Context | undefined;
  let layers: WordLayer[] = [];
  const media = view.matchMedia('(prefers-reduced-motion: reduce)');

  const effect = document.createElement('div');
  effect.className = 'cl-effect';
  const stage = document.createElement('div');
  stage.className = 'cl-stage';
  const words = document.createElement('ul');
  words.className = 'cl-words';
  words.setAttribute('role', 'list');
  const measurements = document.createElement('div');
  measurements.className = 'cl-measurements';
  measurements.setAttribute('aria-hidden', 'true');
  stage.append(words);
  effect.append(stage, measurements);
  root.append(effect);

  function span(className: string) {
    const node = document.createElement('span');
    node.className = className;
    return node;
  }

  function render() {
    if (destroyed || effect.dataset.clMotion !== 'true') return;
    const transitions = layers.length - 1;
    if (transitions <= 0) {
      layers[0]?.letters.forEach((letter) => {
        const pose = sampleCinemaPhase('incoming', 1);
        letter.pose(pose);
        letter.opacity(faceOpacity(pose));
      });
      return;
    }
    const time = progress * transitions;
    const pair = Math.min(transitions - 1, Math.floor(time));
    const phase = time - pair;
    layers.forEach((layer, index) => {
      layer.letters.forEach((letter) => {
        if (index !== pair && index !== pair + 1) { letter.opacity(0); return; }
        // Preserve the original normalized stagger and 15%/70%/15% phase.
        const localPhase = clamp01((phase - letter.offset) / letter.duration);
        const motionProgress = clamp01((localPhase - .15) / .7);
        const pose = sampleCinemaPhase(index === pair ? 'outgoing' : 'incoming', motionProgress);
        letter.pose(pose);
        letter.opacity(faceOpacity(pose));
      });
    });
  }

  function refresh() {
    if (destroyed) return;
    if (refreshFrame) { view!.cancelAnimationFrame(refreshFrame); refreshFrame = 0; }
    if (effect.dataset.clMotion !== 'true') return;
    measureLetters(effect, measurements);
    const item = layers[0]?.item;
    if (item) {
      const height = parseFloat(view!.getComputedStyle(item).height);
      if (height > 0 && Number.isFinite(height)) {
        effect.style.setProperty('--cl-depth', `${height * CINEMA_MODEL.depthRatio}px`);
        effect.style.setProperty('--cl-perspective', `${height * CINEMA_MODEL.cameraDistanceToHeight}px`);
      }
    }
    render();
  }

  function scheduleRefresh() {
    if (destroyed || refreshFrame) return;
    refreshFrame = view!.requestAnimationFrame(() => { refreshFrame = 0; refresh(); });
  }

  function build() {
    context?.revert();
    context = undefined;
    layers = [];
    words.replaceChildren();
    effect.dataset.clMotion = String(!(settings.reducedMotion ?? media.matches));
    settings.words.forEach((label) => {
      const item = document.createElement('li');
      item.className = 'cl-item';
      item.setAttribute('aria-label', label);
      const measure = span('cl-measure');
      measure.setAttribute('aria-hidden', 'true');
      measure.textContent = label;
      item.append(measure);
      splitLetters(label).forEach((letter) => {
        const node = span('cl-letter');
        node.setAttribute('aria-hidden', 'true');
        node.dataset.letterStart = String(letter.start);
        node.dataset.letterEnd = String(letter.end);
        const axis = span('cl-axis');
        const pitch = span('cl-pitch');
        const compensation = span('cl-compensation');
        const face = span('cl-face');
        const word = span('cl-word');
        const glyph = span('cl-glyph');
        glyph.textContent = letter.text;
        word.append(glyph);
        face.append(word);
        compensation.append(face);
        pitch.append(compensation);
        axis.append(pitch);
        node.append(axis);
        item.append(node);
      });
      words.append(item);
    });

    if (effect.dataset.clMotion === 'true') {
      context = gsap.context(() => {
        layers = [...words.children].map((element) => {
          const item = element as HTMLElement;
          const nodes = [...item.querySelectorAll<HTMLElement>('.cl-letter')];
          const letters = nodes.map((node, index, all) => {
            const axis = node.querySelector<HTMLElement>('.cl-axis')!;
            const pitch = node.querySelector<HTMLElement>('.cl-pitch')!;
            const compensation = node.querySelector<HTMLElement>('.cl-compensation')!;
            const word = node.querySelector<HTMLElement>('.cl-word')!;
            gsap.set([axis, compensation], { rotationZ: 0 });
            gsap.set(pitch, { rotationX: 0 });
            gsap.set(word, { opacity: 0 });
            const setAxis = gsap.quickSetter(axis, 'rotationZ', 'deg');
            const setPitch = gsap.quickSetter(pitch, 'rotationX', 'deg');
            const setCompensation = gsap.quickSetter(compensation, 'rotationZ', 'deg');
            const setOpacity = gsap.quickSetter(word, 'opacity');
            return {
              ...getLetterTiming(index, all.length, settings),
              pose(value: CinemaPose) {
                setAxis(value.parentBank);
                setPitch(value.pitch);
                setCompensation(value.childBank);
              },
              opacity(value: number) { setOpacity(value); },
            };
          });
          return { item, letters };
        });
      }, effect);
    }
    refresh();
  }

  function onPreferenceChange() {
    if (!destroyed && settings.reducedMotion === undefined) build();
  }
  const resizeObserver = new ResizeObserver(scheduleRefresh);
  resizeObserver.observe(root);
  media.addEventListener('change', onPreferenceChange);
  document.fonts.addEventListener('loadingdone', scheduleRefresh);
  void document.fonts.ready.then(scheduleRefresh);
  build();

  return {
    setProgress(value) {
      if (destroyed || !Number.isFinite(value)) return;
      progress = clamp01(value);
      render();
    },
    update(next) {
      if (destroyed) return;
      settings = normalize(settings, next);
      build();
    },
    refresh,
    destroy() {
      if (destroyed) return;
      destroyed = true;
      if (refreshFrame) view.cancelAnimationFrame(refreshFrame);
      resizeObserver.disconnect();
      media.removeEventListener('change', onPreferenceChange);
      document.fonts.removeEventListener('loadingdone', scheduleRefresh);
      context?.revert();
      effect.remove();
      layers = [];
    },
  };
}
