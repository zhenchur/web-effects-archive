import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { effects, repositoryUrl } from './registry';
import './style.css';

const app = document.querySelector<HTMLDivElement>('#app')!;
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');

app.innerHTML = `
  <a class="skip-link" href="#effects">К эффектам</a>
  <header class="site-header">
    <a class="brand" href="#top">Веб архив</a>
    <a class="github-link" href="${repositoryUrl}" target="_blank" rel="noreferrer">GitHub ↗</a>
  </header>
  <main class="archive" id="top">
    <nav class="archive-nav" aria-label="Эффекты">
      ${effects.map(entry => `<a href="#${entry.id}">${entry.title}</a>`).join('')}
    </nav>
    <div class="effects" id="effects" tabindex="-1">
      ${effects.map(entry => `
        <section class="effect-section" id="${entry.id}" aria-labelledby="${entry.id}-title">
          <div class="effect-viewport">
            <h2 id="${entry.id}-title">${entry.title}</h2>
            <div class="effect-host"></div>
          </div>
        </section>
      `).join('')}
    </div>
  </main>
`;

const header = app.querySelector<HTMLElement>('.site-header')!;
const scenes = effects.map(entry => {
  const section = document.getElementById(entry.id)!;
  const viewport = section.querySelector<HTMLElement>('.effect-viewport')!;
  const host = section.querySelector<HTMLElement>('.effect-host')!;
  const link = app.querySelector<HTMLAnchorElement>(`.archive-nav a[href="#${entry.id}"]`)!;
  return { entry, section, viewport, host, link, effect: entry.create(host), start: 0, travel: 1 };
});
let frame = 0;
let disposed = false;
let smoothScroll: Lenis | undefined;

function render() {
  if (disposed) return;
  const scroll = window.scrollY;
  let current = scenes[0];
  for (const scene of scenes) {
    if (scroll >= scene.start - 1) current = scene;
    if (!motionPreference.matches) {
      scene.effect.setProgress(Math.max(0, Math.min(1, (scroll - scene.start) / scene.travel)));
    }
  }
  for (const scene of scenes) {
    if (scene === current) scene.link.setAttribute('aria-current', 'location');
    else scene.link.removeAttribute('aria-current');
  }
}

function scheduleRender() {
  // Lenis emits after updating native scroll; render in that same frame.
  if (smoothScroll) return;
  if (!frame && !disposed) frame = requestAnimationFrame(() => {
    frame = 0;
    render();
  });
}

function syncSmoothScroll() {
  cancelAnimationFrame(frame);
  frame = 0;
  smoothScroll?.destroy();
  smoothScroll = undefined;
  if (!motionPreference.matches) {
    smoothScroll = new Lenis({
      lerp: .1,
      smoothWheel: true,
      syncTouch: false,
      autoRaf: true,
    });
    smoothScroll.on('scroll', render);
  }
}

function onAnchorClick(event: MouseEvent) {
  if (!smoothScroll || event.defaultPrevented || event.button !== 0
    || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
  const link = event.target instanceof Element
    ? event.target.closest<HTMLAnchorElement>('a[href^="#"]') : null;
  if (!link || link.hasAttribute('download') || (link.target && link.target !== '_self')) return;
  const target = document.getElementById(link.hash.slice(1));
  if (!target) return;
  event.preventDefault();
  if (location.hash !== link.hash) history.pushState(null, '', link.hash);
  smoothScroll.scrollTo(target, {
    onComplete: () => {
      if (link.classList.contains('skip-link')) target.focus({ preventScroll: true });
    },
  });
}

function onHashChange() {
  // Back/Forward has already restored native scroll, including an empty hash.
  smoothScroll?.scrollTo(window.scrollY, { immediate: true });
}

function measure() {
  if (disposed) return;
  // Let the last word settle before the next effect enters the viewport.
  const step = Math.max(300, window.innerHeight * .9);
  const headerHeight = header.offsetHeight;
  for (const scene of scenes) {
    scene.travel = step * Math.max(1, scene.entry.steps);
    scene.section.style.height = motionPreference.matches
      ? 'auto'
      : `${scene.viewport.offsetHeight + scene.travel + step * .4}px`;
    scene.effect.refresh();
  }
  for (const scene of scenes) {
    scene.start = scene.section.getBoundingClientRect().top + window.scrollY - headerHeight;
  }
  smoothScroll?.resize();
  render();
}

function onMotionPreferenceChange() {
  // The reusable effect follows the same system preference independently.
  syncSmoothScroll();
  measure();
}

window.addEventListener('scroll', scheduleRender, { passive: true });
window.addEventListener('resize', measure);
window.addEventListener('pageshow', measure);
window.addEventListener('hashchange', onHashChange);
app.addEventListener('click', onAnchorClick);
motionPreference.addEventListener('change', onMotionPreferenceChange);
document.fonts.addEventListener('loadingdone', measure);
void document.fonts.ready.then(measure);
syncSmoothScroll();
measure();

// Preserve old shared links to the first effect.
if (['#effect', '#collection'].includes(location.hash)) {
  history.replaceState(null, '', `#${effects[0]!.id}`);
  scenes[0]!.section.scrollIntoView();
}

if (import.meta.hot) import.meta.hot.dispose(() => {
  disposed = true;
  cancelAnimationFrame(frame);
  smoothScroll?.destroy();
  window.removeEventListener('scroll', scheduleRender);
  window.removeEventListener('resize', measure);
  window.removeEventListener('pageshow', measure);
  window.removeEventListener('hashchange', onHashChange);
  app.removeEventListener('click', onAnchorClick);
  motionPreference.removeEventListener('change', onMotionPreferenceChange);
  document.fonts.removeEventListener('loadingdone', measure);
  scenes.forEach(scene => scene.effect.destroy());
});
