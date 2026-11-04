import { gsap } from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import { clampPosition, FILM_CENTER_SPACING, projectFilmRelease, sampleFilmCard } from './model';

gsap.registerPlugin(CustomEase);
const selectionEase = CustomEase.create('film-cards-selection', '.22,0,.23,1');

export { FILM_CARDS } from './demo-cards';

export interface FilmCard {
  src: string;
  title: string;
  subtitle?: string;
  alt?: string;
}

export interface FilmCardsOptions {
  cards: readonly FilmCard[];
  mode?: 'drag' | 'scroll';
  initialIndex?: number;
  reducedMotion?: boolean;
  label?: string;
}

export interface FilmCards {
  setProgress(progress: number): void;
  select(index: number, animate?: boolean): void;
  refresh(): void;
  destroy(): void;
}

/** The host owns pinning and scroll. This module never listens to wheel events. */
export function createFilmCards(host: HTMLElement, options: FilmCardsOptions): FilmCards {
  const doc = host.ownerDocument;
  const view = doc.defaultView;
  if (!view) throw new Error('Film Cards requires a browser document.');
  if (!options.cards.length) throw new Error('Film Cards requires at least one card.');
  const cards = [...options.cards];
  const mode = options.mode ?? 'drag';
  const preference = view.matchMedia('(prefers-reduced-motion: reduce)');
  const events = new AbortController();
  const state = { position: clampPosition(options.initialIndex ?? 0, cards.length) };
  let progress = state.position / Math.max(1, cards.length - 1);
  let width = 320;
  let active = -1;
  let destination = Math.round(state.position);
  let reduced = false;
  let disposed = false;
  let animation: gsap.core.Tween | undefined;
  let suppressedUntil = 0;
  let gesture: { id: number; x: number; y: number; start: number; lastX: number; time: number; velocity: number; dragging: boolean } | undefined;

  const root = doc.createElement('div');
  root.className = `film-gallery film-gallery--${mode}`;
  root.setAttribute('role', 'region');
  root.setAttribute('aria-roledescription', 'карусель');
  root.setAttribute('aria-label', options.label ?? 'Коллекция пейзажей');
  const stage = doc.createElement('div');
  stage.className = 'film-stage';
  if (mode === 'drag') {
    stage.tabIndex = 0;
    stage.setAttribute('aria-label', 'Карточки. Стрелки влево и вправо переключают кадры.');
  }
  const deck = doc.createElement('div');
  deck.className = 'film-deck';
  stage.append(deck);
  const footer = doc.createElement('div');
  footer.className = 'film-footer';
  const caption = doc.createElement('div');
  caption.className = 'film-caption';
  const title = doc.createElement('span');
  title.className = 'film-title';
  const subtitle = doc.createElement('span');
  subtitle.className = 'film-subtitle';
  const count = doc.createElement('span');
  count.className = 'film-count';
  caption.append(title, subtitle, count);
  const cues = doc.createElement('div');
  cues.className = 'film-cues';
  cues.setAttribute('aria-label', 'Выбор кадра');
  footer.append(caption, cues);
  root.append(stage, footer);
  host.append(root);

  const rows = cards.map((card, index) => {
    const element = doc.createElement(mode === 'drag' ? 'button' : 'div');
    element.className = 'film-card';
    element.dataset.filmIndex = String(index);
    element.setAttribute('aria-label', `${index + 1}. ${card.title}`);
    if (element instanceof HTMLButtonElement) {
      element.type = 'button';
      element.tabIndex = -1;
    } else element.setAttribute('role', 'group');
    const img = doc.createElement('img');
    img.src = card.src;
    img.alt = card.alt ?? card.title;
    img.width = 1200;
    img.height = 750;
    img.draggable = false;
    img.decoding = 'async';
    const shade = doc.createElement('span');
    shade.className = 'film-shade';
    shade.setAttribute('aria-hidden', 'true');
    const staticTitle = doc.createElement('span');
    staticTitle.className = 'film-static-title';
    staticTitle.textContent = card.title;
    element.append(img, shade, staticTitle);
    deck.append(element);
    const cue = doc.createElement(mode === 'drag' ? 'button' : 'span');
    cue.className = 'film-cue';
    cue.dataset.filmIndex = String(index);
    if (cue instanceof HTMLButtonElement) {
      cue.type = 'button';
      cue.setAttribute('aria-label', `Показать кадр ${index + 1}: ${card.title}`);
      cue.addEventListener('click', () => select(index), { signal: events.signal });
    }
    const number = doc.createElement('span');
    number.className = 'film-cue-number';
    number.textContent = String(index + 1).padStart(2, '0');
    const label = doc.createElement('span');
    label.className = 'film-cue-label';
    label.textContent = card.title;
    cue.append(number, label);
    cues.append(cue);
    return { element, shade, cue };
  });
  cues.style.setProperty('--film-count', String(cards.length));

  function render() {
    if (disposed) return;
    const selected = Math.round(clampPosition(state.position, cards.length));
    root.dataset.position = state.position.toFixed(4);
    if (!reduced) rows.forEach(({ element, shade }, index) => {
      const pose = sampleFilmCard(index, state.position, width);
      gsap.set(element, { x: pose.x, z: pose.z, rotationY: pose.rotationY, scale: pose.scale, zIndex: pose.zIndex });
      shade.style.opacity = String(pose.shade);
    });
    if (selected !== active) {
      active = selected;
      root.dataset.activeIndex = String(active);
      title.textContent = cards[active]!.title;
      subtitle.textContent = cards[active]!.subtitle ?? '';
      count.textContent = `${String(active + 1).padStart(2, '0')} / ${String(cards.length).padStart(2, '0')}`;
      rows.forEach(({ element, cue }, index) => {
        const current = index === active;
        element.dataset.active = String(current);
        if (current) cue.setAttribute('aria-current', 'true');
        else cue.removeAttribute('aria-current');
      });
    }
  }

  function select(index: number, animate = true) {
    if (disposed) return;
    const next = Math.round(clampPosition(index, cards.length));
    destination = next;
    animation?.kill();
    if (!animate || reduced) {
      state.position = next;
      render();
      return;
    }
    animation = gsap.to(state, {
      position: next, duration: .7, ease: selectionEase, overwrite: true,
      onUpdate: render,
    });
  }

  function endGesture(cancelled = false) {
    if (!gesture) return;
    const ending = gesture;
    gesture = undefined;
    root.removeAttribute('data-dragging');
    if (stage.hasPointerCapture(ending.id)) stage.releasePointerCapture(ending.id);
    if (!ending.dragging) { select(Math.round(state.position)); return; }
    suppressedUntil = view!.performance.now() + 350;
    const velocity = cancelled || view!.performance.now() - ending.time > 100 ? 0 : ending.velocity;
    select(projectFilmRelease(state.position, velocity, cards.length));
  }

  function refresh() {
    if (disposed) return;
    const nextReduced = options.reducedMotion ?? preference.matches;
    if (nextReduced !== reduced) {
      endGesture(true);
      animation?.kill();
      reduced = nextReduced;
      root.dataset.reduced = String(reduced);
      if (reduced) {
        state.position = destination;
        rows.forEach(({ element, shade }) => {
          gsap.set(element, { clearProps: 'transform,zIndex' });
          shade.style.opacity = '0';
        });
      }
      else if (mode === 'scroll') state.position = progress * (cards.length - 1);
    }
    if (!reduced) {
      const widthRatio = stage.clientWidth < 600 ? .8 : .43;
      const nextWidth = Math.max(80, Math.min(640, stage.clientWidth * widthRatio, stage.clientHeight * 1.9));
      if (gesture?.dragging && nextWidth !== width) {
        gesture.start = state.position;
        gesture.x = gesture.lastX;
        gesture.velocity = 0;
      }
      width = nextWidth;
      root.style.setProperty('--film-card-width', `${width}px`);
      root.style.setProperty('--film-perspective', `${width * 1.65}px`);
    }
    render();
  }

  if (mode === 'drag') {
    stage.addEventListener('pointerdown', event => {
      if (reduced || !event.isPrimary || event.button !== 0) return;
      animation?.kill();
      destination = Math.round(state.position);
      gesture = { id: event.pointerId, x: event.clientX, y: event.clientY, start: state.position,
        lastX: event.clientX, time: view.performance.now(), velocity: 0, dragging: false };
    }, { signal: events.signal });
    view.addEventListener('pointermove', event => {
      if (!gesture || gesture.id !== event.pointerId) return;
      const dx = event.clientX - gesture.x;
      const dy = event.clientY - gesture.y;
      if (!gesture.dragging) {
        if (Math.abs(dy) > 8 && Math.abs(dy) > Math.abs(dx)) { gesture = undefined; return; }
        if (Math.abs(dx) < 6) return;
        gesture.dragging = true;
        stage.setPointerCapture(event.pointerId);
        root.dataset.dragging = 'true';
      }
      const now = view.performance.now();
      const pitch = width * FILM_CENTER_SPACING;
      const speed = -(event.clientX - gesture.lastX) / pitch / Math.max(1, now - gesture.time);
      gesture.velocity = gesture.velocity * .35 + speed * .65;
      gesture.time = now;
      gesture.lastX = event.clientX;
      state.position = clampPosition(gesture.start - dx / pitch, cards.length);
      render();
    }, { signal: events.signal });
    view.addEventListener('pointerup', event => {
      if (gesture?.id === event.pointerId) endGesture();
    }, { signal: events.signal });
    view.addEventListener('pointercancel', event => {
      if (gesture?.id === event.pointerId) endGesture(true);
    }, { signal: events.signal });
    stage.addEventListener('lostpointercapture', () => endGesture(true), { signal: events.signal });
    view.addEventListener('blur', () => endGesture(true), { signal: events.signal });
    stage.addEventListener('dragstart', event => event.preventDefault(), { signal: events.signal });
    stage.addEventListener('click', event => {
      if (view.performance.now() < suppressedUntil) { event.preventDefault(); return; }
      const target = event.target instanceof Element ? event.target.closest<HTMLElement>('[data-film-index]') : null;
      if (target) select(Number(target.dataset.filmIndex));
    }, { signal: events.signal });
    root.addEventListener('keydown', event => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key) || reduced) return;
      event.preventDefault();
      select(event.key === 'Home' ? 0 : event.key === 'End' ? cards.length - 1
        : destination + (event.key === 'ArrowRight' ? 1 : -1));
    }, { signal: events.signal });
  }

  const observer = new ResizeObserver(refresh);
  observer.observe(stage);
  preference.addEventListener('change', refresh, { signal: events.signal });
  refresh();

  return {
    setProgress(value) {
      if (disposed || mode !== 'scroll') return;
      const next = clampPosition(value, 2);
      if (next === progress && state.position === next * (cards.length - 1)) return;
      progress = next;
      animation?.kill();
      state.position = progress * (cards.length - 1);
      render();
    },
    select,
    refresh,
    destroy() {
      if (disposed) return;
      endGesture(true);
      disposed = true;
      animation?.kill();
      events.abort();
      observer.disconnect();
      root.remove();
    },
  };
}
