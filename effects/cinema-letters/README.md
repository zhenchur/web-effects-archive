# Cinema Letters

Переносимый эффект смены слов по модели Cinema 4D. TypeScript, обычный DOM и GSAP; React, Lenis и ScrollTrigger не требуются.

## Скачанный ZIP

Распакуйте архив, откройте папку `cinema-letters` в терминале и выполните `npm install`, затем `npm run dev`. Браузер откроет самостоятельное демо из `demo/`.

Для своего проекта скопируйте папку `effects/cinema-letters`, установите `gsap` и используйте пример ниже. В `demo/` также есть готовый JavaScript со встроенным GSAP и отдельный CSS: их можно подключить без сборки, как показано в `demo/index.html`.

## Подключение

```ts
import { createCinemaLetters } from './effects/cinema-letters';
import './effects/cinema-letters/style.css';

const effect = createCinemaLetters(document.querySelector<HTMLElement>('#scene')!, {
  words: ['Made by', 'Google', 'Gemini', 'Android', 'Pixel'],
  staggerEnabled: true,
  staggerAmount: .04,
  staggerFrom: 'start',
});

// Скролл, таймлайн или ползунок передают общий прогресс всей последовательности.
effect.setProgress(.5);
effect.update({ staggerAmount: .08 });
effect.refresh();
// При удалении страницы или компонента:
effect.destroy();
```

Хост задаёт высоту и типографику. Например:

```css
#scene { height: min(70svh, 720px); font-family: Arial, sans-serif; --cl-font-size: clamp(48px, 10vw, 180px); }
```

`setProgress(0…1)` покрывает все переходы: при пяти словах значения `0`, `.25`, `.5`, `.75`, `1` показывают очередное слово целиком. Длина скролла, фиксация секции и финальная пауза принадлежат приложению. Для воспроизведения исходной страницы: на каждый переход отводится `max(300px, 90svh)`, после последнего слова — ещё `0.4` такого шага.

## API

- `words`: произвольный непустой список строк. Пустые строки отбрасываются; полностью пустой список заменяется исходными пятью словами.
- `staggerEnabled`: включить разницу времени между буквами, по умолчанию `true`.
- `staggerAmount`: доля перехода от `0` до `.5`, по умолчанию `.04`. Общая длительность перехода сохраняется.
- `staggerFrom`: `'start'` или `'end'`, по умолчанию `'start'`.
- `reducedMotion`: без значения следует системной настройке. `true` показывает статический список; `false` явно включает движение. `update({ reducedMotion: undefined })` возвращает системную настройку.
- `refresh()`: повторное измерение после изменения стилей хоста. Размер хоста и загрузка шрифтов отслеживаются автоматически.
- `destroy()`: удаляет только собственное дерево DOM и свои наблюдатели/обработчики. Безопасен при повторном вызове. Отложенное завершение загрузки шрифтов после удаления ничего не меняет.

CSS-параметры: `--cl-font-size`, `--cl-font-weight` (500), `--cl-center-offset` (3/140 em). Цвет и семейство шрифта наследуются. Высота строки `.9` сохранена. Не назначайте перспективу, transform или CSS-фильтры самому хосту и его предкам: они могут изменить измерение и проекцию сцены.

## Сохранённая модель

`model.ts` — точная копия исходного `audienceCinemaModel.ts`, без изменений математики и кривой. Сцена: плоскость `400 × 86.77616756322344`, ось на глубине `50`, камера на расстоянии `300`, объектив `22 mm`, сенсор `36 mm`. Глубина и перспектива масштабируются пропорционально высоте строки.

Порядок преобразований: `Tz(-d) · Rz(-β) · Rx(θ) · Rz(+β) · Tz(d)`. Приход: `−90° → 0°`; уход: `0° → 90°`. Наклон `β` меняется от `10°` до `0°` и обратно. Кривая `cubic-bezier(.838, 0, .162, 1)` вычисляется исходным методом, с 36 итерациями. Сохранены участок движения `15%…85%` перехода и угловой fade `smoothstep((.82 - abs(pitch)/90)/.34)`.

Каждая буква получает исходную вложенность и ось целого слова. Пробелы и расстояния измеряются по полной строке. У каждой буквы скрыта дублирующая семантика; список содержит один доступный текст для каждого слова. Разбиение, как в исходнике, выполняется по Unicode code points; сложные составные emoji и письменности с соединяемыми глифами требуют отдельной адаптации.

Эффект не изменяет `body`, глобальные стили, localStorage, адрес страницы или скролл. Оптимизации модели намеренно не добавлялись. Для эффекта в React вызывайте фабрику после монтирования DOM и `destroy()` в cleanup.

```tsx
// Адаптер необязателен: React не входит в зависимости эффекта.
import { useEffect, useRef } from 'react';
import { createCinemaLetters, type CinemaLetters } from './effects/cinema-letters';
import './effects/cinema-letters/style.css';

export function Letters({ progress }: { progress: number }) {
  const host = useRef<HTMLDivElement>(null);
  const effect = useRef<CinemaLetters | null>(null);
  useEffect(() => {
    const scene = createCinemaLetters(host.current!);
    effect.current = scene;
    return () => { scene.destroy(); effect.current = null; };
  }, []);
  useEffect(() => { effect.current?.setProgress(progress); }, [progress]);
  return <div ref={host} style={{ height: '70svh', fontSize: '10vw' }} />;
}
```

