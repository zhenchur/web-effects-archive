import { createCinemaLetters } from '../effects/cinema-letters/index';
import '../effects/cinema-letters/style.css';
import { effects, repositoryUrl } from './registry';
import './style.css';

const entry = effects[0]!;
const defaults = {
  words: ['Made by', 'Google', 'Gemini', 'Android', 'Pixel'],
  staggerEnabled: true,
  staggerAmount: 0.04,
  staggerFrom: 'start' as 'start' | 'end',
};
type Preset = typeof defaults;
const storageKey = 'web-effects-archive:cinema-letters:v1';
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
let preset = loadPreset();
let progress = 0;
let playing = false;
let playFrame = 0;
let scrollFrame = 0;
let scrollMode = false;
let toastTimer: ReturnType<typeof setTimeout> | undefined;

const arrow = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 18 18 6M6 6h12v12" stroke="currentColor" stroke-width="1.5"/></svg>';
const playIcon = '<svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="m7 4 9 6-9 6V4Z" fill="currentColor"/></svg>';
const pauseIcon = '<svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M6 4h3v12H6zm6 0h3v12h-3z" fill="currentColor"/></svg>';
const restartIcon = '<svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M4.7 6.3A6 6 0 1 1 4 11M4 3v4h4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <a class="skip-link" href="#effect">К демо</a>
  <header class="site-header">
    <a class="brand" href="#" aria-label="Веб архив — главная"><span class="brand-mark" aria-hidden="true"><i></i><i></i><i></i><i></i></span>Веб архив<span class="brand-dot" aria-hidden="true">+</span></a>
    <nav class="header-nav" aria-label="Основная навигация"><a class="header-current" href="#collection">Эффекты <span>${String(effects.length).padStart(2, '0')}</span></a><a href="${repositoryUrl}" target="_blank" rel="noreferrer">GitHub ${arrow}</a></nav>
  </header>
  <main class="page-shell">
    <section class="archive-intro" aria-labelledby="archive-title">
      <div><p class="eyebrow">Коллекция веб-экспериментов</p><h1 id="archive-title">Сохраняем движение.</h1></div>
      <p class="intro-copy">Живые демо и открытые исходники. <br>Чтобы удачный эффект стал началом<br class="desktop-break"> следующего проекта.</p>
    </section>
    <div class="workspace">
      <aside class="collection" id="collection" aria-label="Каталог эффектов">
        <div class="section-caption"><span>Коллекция</span><span>${String(effects.length).padStart(2, '0')}</span></div>
        <a class="collection-item" href="#effect" aria-current="true"><span class="collection-preview" aria-hidden="true"><span>Ag</span><span>Ag</span></span><span class="collection-item-text"><strong>${entry.title}</strong><small>${entry.category}</small></span><span class="collection-index">01</span></a>
        <p class="collection-note">Архив растёт вместе<br>с новыми экспериментами.</p>
        <a class="collection-source" href="${repositoryUrl}" target="_blank" rel="noreferrer">Все исходники ${arrow}</a>
      </aside>
      <article class="effect" id="effect" aria-labelledby="effect-title">
        <header class="effect-header"><div><p class="eyebrow">${entry.number} / ${entry.category}</p><h2 id="effect-title">${entry.title}</h2><p class="effect-description">${entry.description}</p></div><span class="version">v${entry.version}</span></header>
        <div class="effect-toolbar"><div class="tabs" role="tablist" aria-label="Просмотр эффекта"><button type="button" id="tab-demo" role="tab" aria-selected="true" aria-controls="panel-demo" tabindex="0">Демо</button><button type="button" id="tab-code" role="tab" aria-selected="false" aria-controls="panel-code" tabindex="-1">Подключение</button></div><div class="tags">${entry.tags.map(tag => `<span>${tag}</span>`).join('')}</div></div>
        <section id="panel-demo" class="demo-panel" role="tabpanel" aria-labelledby="tab-demo">
          <div class="demo-surface"><div class="demo-topline"><span><i class="status-dot"></i>Интерактивное демо</span><button type="button" class="quiet-button" id="scroll-launch">Попробовать скроллом ${arrow}</button></div><div id="demo-mount"><div id="stage-viewport" class="stage-viewport"><div id="effect-host" class="effect-host"></div></div></div><p id="reduced-motion-note" class="motion-note" hidden>В системе включено уменьшение движения. Показана статичная версия.</p><div class="demo-bottomline"><span>Модель Cinema 4D</span><span>Управляйте движением ↓</span></div></div>
          <div class="transport"><button type="button" class="play-button" id="play" aria-label="Воспроизвести анимацию">${playIcon}<span>Запустить</span></button><button type="button" class="icon-button" id="restart" aria-label="Начать сначала" title="Начать сначала">${restartIcon}</button><label class="timeline-label" for="timeline"><span class="sr-only">Прогресс анимации</span><input type="range" id="timeline" min="0" max="1000" value="0" step="1"></label><output id="progress-value" for="timeline">0%</output></div>
          <div class="word-sequence" id="word-sequence" aria-label="Перейти к слову"></div>
          <details class="settings" open><summary><span>Настройки эффекта <small>Под себя и свой проект</small></span><span class="summary-plus" aria-hidden="true">+</span></summary><div class="settings-body"><div class="stagger-settings"><label class="switch-row" for="stagger-enabled"><span>Последовательно по буквам</span><input id="stagger-enabled" type="checkbox" role="switch"><span class="switch-track" aria-hidden="true"></span></label><div class="field-row"><label for="stagger-amount">Разброс</label><output id="stagger-value" for="stagger-amount">4%</output></div><input id="stagger-amount" type="range" min="0" max="50" step="1" value="4"><p class="field-help">Доля перехода между первой и последней буквой.</p><label class="select-field" for="stagger-from"><span>Направление</span><select id="stagger-from"><option value="start">Слева направо</option><option value="end">Справа налево</option></select></label></div><form id="words-form" class="words-settings"><label for="words">Слова <small>Каждое с новой строки</small></label><textarea id="words" rows="5" spellcheck="false" maxlength="500" aria-describedby="words-error"></textarea><p id="words-error" class="field-error" role="alert" hidden></p><button type="submit" class="small-button">Применить слова</button></form></div><div class="settings-footer"><span>Настройки сохраняются в этом браузере</span><div><button id="reset" type="button" class="text-button">Сбросить</button><button id="export" type="button" class="text-button">Скачать пресет ${arrow}</button></div></div></details>
        </section>
        <section id="panel-code" class="code-panel" role="tabpanel" aria-labelledby="tab-code" hidden><div class="code-intro"><div><h3>Забрать в проект</h3><p>Скачайте модуль, установите GSAP и подключите эффект к любому контейнеру. Анимацией управляет прогресс от 0 до 1.</p></div><a class="download-button" href="${import.meta.env.BASE_URL}${entry.downloadPath}" download>Скачать исходники ${arrow}</a></div><div class="code-block"><div class="code-caption"><span>Установка</span><button type="button" class="copy-button" data-copy="install">Копировать</button></div><pre><code id="install-code">npm install gsap</code></pre></div><div class="code-block"><div class="code-caption"><span>Подключение · TypeScript</span><button type="button" class="copy-button" data-copy="integration">Копировать</button></div><pre><code id="integration-code"></code></pre></div><div class="code-links"><a href="${repositoryUrl}/tree/main/${entry.sourcePath}" target="_blank" rel="noreferrer">Открыть модуль на GitHub ${arrow}</a><a href="${repositoryUrl}/blob/main/${entry.sourcePath}/README.md" target="_blank" rel="noreferrer">Документация ${arrow}</a></div><p class="integration-note">Шрифт и размер задаются в вашем проекте. Геометрия, кривые движения и фейд сохранены в модуле; настройки демо меняют только слова и stagger.</p></section>
        <footer class="effect-footer"><span>Один эффект. Любой проект.</span><a href="${repositoryUrl}/tree/main/${entry.sourcePath}" target="_blank" rel="noreferrer">Посмотреть исходники ${arrow}</a></footer>
      </article>
    </div>
    <section id="scroll-lab" class="scroll-lab" aria-label="Проверка анимации прокруткой" hidden><div class="scroll-sticky"><div class="scroll-topline"><div><p class="eyebrow">Проверка в движении</p><h2>Теперь просто скролльте.</h2></div><button type="button" id="scroll-exit" class="small-button">Вернуться к демо ↑</button></div><div class="scroll-stage" id="scroll-mount"></div><div class="scroll-bottomline"><span>↓ Прокрутка управляет переходом</span><output id="scroll-progress">0%</output></div></div></section>
  </main>
  <footer class="site-footer"><span>Веб архив / 2026</span><span>Эксперименты, которые хочется сохранить.</span><a href="${repositoryUrl}" target="_blank" rel="noreferrer">GitHub ${arrow}</a></footer>
  <div id="toast" class="toast" role="status" aria-live="polite"></div>
`;

function element<T extends HTMLElement = HTMLElement>(id: string): T {
  return document.getElementById(id) as T;
}
const host = element('effect-host');
const stageViewport = element('stage-viewport');
const timeline = element<HTMLInputElement>('timeline');
const playButton = element<HTMLButtonElement>('play');
const wordsInput = element<HTMLTextAreaElement>('words');
const staggerEnabled = element<HTMLInputElement>('stagger-enabled');
const staggerAmount = element<HTMLInputElement>('stagger-amount');
const staggerFrom = element<HTMLSelectElement>('stagger-from');
const scrollLab = element('scroll-lab');
let effect = createCinemaLetters(host, { ...preset, reducedMotion: motionPreference.matches });

function loadPreset(): Preset {
  try {
    const value = JSON.parse(localStorage.getItem(storageKey) ?? 'null') as Partial<Preset> | null;
    if (!value) return { ...defaults, words: [...defaults.words] };
    return {
      words: validWords(value.words) ? value.words! : [...defaults.words],
      staggerEnabled: typeof value.staggerEnabled === 'boolean' ? value.staggerEnabled : defaults.staggerEnabled,
      staggerAmount: typeof value.staggerAmount === 'number' && Number.isFinite(value.staggerAmount) ? Math.max(0, Math.min(0.5, value.staggerAmount)) : defaults.staggerAmount,
      staggerFrom: value.staggerFrom === 'end' ? 'end' : 'start',
    };
  } catch { return { ...defaults, words: [...defaults.words] }; }
}

function validWords(value: unknown): value is string[] {
  return Array.isArray(value) && value.length >= 2 && value.length <= 12 && value.every(word => typeof word === 'string' && word.trim().length > 0 && Array.from(word).length <= 40);
}

function persist() {
  try { localStorage.setItem(storageKey, JSON.stringify(preset)); } catch { /* The demo also works without storage. */ }
}

function showToast(message: string) {
  const toast = element('toast');
  toast.textContent = message;
  toast.classList.add('is-visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 2500);
}

function renderWordButtons() {
  const sequence = element('word-sequence');
  sequence.replaceChildren();
  preset.words.forEach((word, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = word;
    button.dataset.wordIndex = String(index);
    button.addEventListener('click', () => { pause(); setProgress(index / (preset.words.length - 1)); });
    sequence.append(button);
    if (index < preset.words.length - 1) {
      const divider = document.createElement('span');
      divider.textContent = '→';
      divider.setAttribute('aria-hidden', 'true');
      sequence.append(divider);
    }
  });
}

function renderSettings(updateWords = true) {
  if (updateWords) wordsInput.value = preset.words.join('\n');
  staggerEnabled.checked = preset.staggerEnabled;
  staggerAmount.value = String(Math.round(preset.staggerAmount * 100));
  element<HTMLOutputElement>('stagger-value').value = `${Math.round(preset.staggerAmount * 100)}%`;
  staggerFrom.value = preset.staggerFrom;
  staggerAmount.disabled = !preset.staggerEnabled;
  staggerFrom.disabled = !preset.staggerEnabled;
  renderWordButtons();
  updateCode();
}

function updateCode() {
  element('integration-code').textContent = `import { createCinemaLetters } from './effects/cinema-letters/index';
import './effects/cinema-letters/style.css';

// <div id="letters" style="height: 400px; --cl-font-size: 100px"></div>
const host = document.querySelector<HTMLElement>('#letters')!;
const effect = createCinemaLetters(host, {
  words: ${JSON.stringify(preset.words)},
  staggerEnabled: ${preset.staggerEnabled},
  staggerAmount: ${preset.staggerAmount},
  staggerFrom: '${preset.staggerFrom}',
});

// Connect a slider, your timeline or scroll progress.
effect.setProgress(0); // 0…1 across all words

// When the container changes size:
effect.refresh();

// On unmount:
// effect.destroy();`;
}

function setProgress(next: number) {
  progress = Math.max(0, Math.min(1, next));
  effect.setProgress(progress);
  timeline.value = String(Math.round(progress * 1000));
  timeline.style.setProperty('--range-progress', `${progress * 100}%`);
  const label = `${Math.round(progress * 100)}%`;
  element<HTMLOutputElement>('progress-value').value = label;
  element<HTMLOutputElement>('scroll-progress').value = label;
  const active = Math.round(progress * (preset.words.length - 1));
  element('word-sequence').querySelectorAll<HTMLButtonElement>('button').forEach((button, index) => {
    button.classList.toggle('is-active', index === active);
    button.setAttribute('aria-pressed', String(index === active));
  });
}

function pause() {
  playing = false;
  cancelAnimationFrame(playFrame);
  playButton.innerHTML = `${playIcon}<span>${progress >= 1 ? 'Ещё раз' : 'Запустить'}</span>`;
  playButton.setAttribute('aria-label', 'Воспроизвести анимацию');
}

function play() {
  if (motionPreference.matches || scrollMode) return;
  if (progress >= 1) setProgress(0);
  playing = true;
  playButton.innerHTML = `${pauseIcon}<span>Пауза</span>`;
  playButton.setAttribute('aria-label', 'Приостановить анимацию');
  const initial = progress;
  const started = performance.now();
  const duration = (preset.words.length - 1) * 1800;
  const tick = (now: number) => {
    if (!playing) return;
    setProgress(initial + (now - started) / duration);
    if (progress >= 1) pause();
    else playFrame = requestAnimationFrame(tick);
  };
  playFrame = requestAnimationFrame(tick);
}

function updatePreset(next: Partial<Preset>, resetProgress = false) {
  pause();
  preset = { ...preset, ...next };
  effect.update(preset);
  persist();
  renderSettings(next.words !== undefined);
  refreshScene();
  setProgress(resetProgress ? 0 : progress);
}

function activateTab(name: 'demo' | 'code') {
  pause();
  if (scrollMode) exitScrollMode();
  for (const tabName of ['demo', 'code']) {
    const selected = tabName === name;
    const button = element<HTMLButtonElement>(`tab-${tabName}`);
    button.setAttribute('aria-selected', String(selected));
    button.tabIndex = selected ? 0 : -1;
    element(`panel-${tabName}`).hidden = !selected;
  }
  if (name === 'demo') requestAnimationFrame(refreshScene);
}

function refreshScene() {
  host.style.removeProperty('--cl-font-size');
  host.style.removeProperty('font-size');
  if (!motionPreference.matches && host.clientWidth > 0) {
    const style = getComputedStyle(host);
    const size = parseFloat(style.fontSize);
    const context = document.createElement('canvas').getContext('2d');
    if (context) {
      context.font = `500 ${size}px ${style.fontFamily}`;
      const width = Math.max(...preset.words.map(word => context.measureText(word).width));
      const available = host.clientWidth * 0.82;
      if (width > available) {
        const fitted = `${size * available / width}px`;
        host.style.setProperty('--cl-font-size', fitted);
        host.style.fontSize = fitted;
      }
    }
  }
  effect.refresh();
}

function enterScrollMode() {
  if (motionPreference.matches) return;
  pause();
  scrollMode = true;
  scrollLab.hidden = false;
  element('scroll-mount').append(stageViewport);
  element('demo-mount').classList.add('is-away');
  timeline.disabled = true;
  playButton.disabled = true;
  element<HTMLButtonElement>('scroll-launch').disabled = true;
  refreshScene();
  scrollLab.scrollIntoView({ behavior: 'instant' });
  updateScrollProgress();
}

function exitScrollMode() {
  if (!scrollMode) return;
  scrollMode = false;
  element('demo-mount').append(stageViewport);
  element('demo-mount').classList.remove('is-away');
  scrollLab.hidden = true;
  timeline.disabled = motionPreference.matches;
  playButton.disabled = motionPreference.matches;
  element<HTMLButtonElement>('scroll-launch').disabled = motionPreference.matches;
  refreshScene();
  element('effect').scrollIntoView({ behavior: 'instant', block: 'start' });
}

function updateScrollProgress() {
  if (!scrollMode) return;
  const sticky = scrollLab.firstElementChild as HTMLElement;
  const top = scrollLab.getBoundingClientRect().top + window.scrollY;
  const stickyTop = parseFloat(getComputedStyle(sticky).top) || 0;
  const distance = Math.max(1, scrollLab.offsetHeight - sticky.offsetHeight);
  setProgress((window.scrollY - top + stickyTop) / distance);
}

function syncMotionPreference() {
  pause();
  if (motionPreference.matches) exitScrollMode();
  host.classList.toggle('is-reduced', motionPreference.matches);
  element('reduced-motion-note').hidden = !motionPreference.matches;
  playButton.disabled = motionPreference.matches;
  timeline.disabled = motionPreference.matches;
  element<HTMLButtonElement>('scroll-launch').disabled = motionPreference.matches;
  effect.update({ reducedMotion: motionPreference.matches });
  refreshScene();
}

playButton.addEventListener('click', () => playing ? pause() : play());
element('restart').addEventListener('click', () => { pause(); setProgress(0); });
timeline.addEventListener('input', () => { pause(); setProgress(Number(timeline.value) / 1000); });
staggerEnabled.addEventListener('change', () => updatePreset({ staggerEnabled: staggerEnabled.checked }));
staggerAmount.addEventListener('input', () => updatePreset({ staggerAmount: Number(staggerAmount.value) / 100 }));
staggerFrom.addEventListener('change', () => updatePreset({ staggerFrom: staggerFrom.value as 'start' | 'end' }));
element('words-form').addEventListener('submit', event => {
  event.preventDefault();
  const words = wordsInput.value.split('\n').map(word => word.trim()).filter(Boolean);
  const error = element('words-error');
  if (!validWords(words)) {
    error.textContent = 'Добавьте от 2 до 12 слов или фраз, до 40 символов в каждой.';
    error.hidden = false;
    return;
  }
  error.hidden = true;
  updatePreset({ words }, true);
  showToast('Слова обновлены');
});
element('reset').addEventListener('click', () => {
  element('words-error').hidden = true;
  updatePreset({ ...defaults, words: [...defaults.words] }, true);
  showToast('Исходные настройки восстановлены');
});
element('export').addEventListener('click', () => {
  const url = URL.createObjectURL(new Blob([JSON.stringify({ effect: entry.id, version: 1, ...preset }, null, 2)], { type: 'application/json' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = 'cinema-letters-preset.json';
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
});
element('scroll-launch').addEventListener('click', enterScrollMode);
element('scroll-exit').addEventListener('click', exitScrollMode);
for (const tabName of ['demo', 'code'] as const) {
  element(`tab-${tabName}`).addEventListener('click', () => activateTab(tabName));
  element(`tab-${tabName}`).addEventListener('keydown', event => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === 'Home' ? 'demo' : event.key === 'End' ? 'code' : tabName === 'demo' ? 'code' : 'demo';
    activateTab(next);
    element(`tab-${next}`).focus();
  });
}
document.querySelectorAll<HTMLButtonElement>('[data-copy]').forEach(button => button.addEventListener('click', async () => {
  const text = element(`${button.dataset.copy}-code`).textContent ?? '';
  try { await navigator.clipboard.writeText(text); showToast('Код скопирован'); }
  catch { showToast('Не удалось скопировать. Выделите код в блоке.'); }
}));
function onScroll() {
  if (!scrollMode || scrollFrame) return;
  scrollFrame = requestAnimationFrame(() => { scrollFrame = 0; updateScrollProgress(); });
}
function onResize() { refreshScene(); updateScrollProgress(); }
function onVisibilityChange() { if (document.hidden) pause(); }
window.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('resize', onResize);
document.addEventListener('visibilitychange', onVisibilityChange);
motionPreference.addEventListener('change', syncMotionPreference);
renderSettings();
syncMotionPreference();
setProgress(0);

if (import.meta.hot) import.meta.hot.dispose(() => {
  pause();
  cancelAnimationFrame(scrollFrame);
  clearTimeout(toastTimer);
  effect.destroy();
  window.removeEventListener('scroll', onScroll);
  window.removeEventListener('resize', onResize);
  document.removeEventListener('visibilitychange', onVisibilityChange);
  motionPreference.removeEventListener('change', syncMotionPreference);
});
