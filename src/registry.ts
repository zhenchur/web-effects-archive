import { createCinemaLetters, DEFAULT_WORDS } from '../effects/cinema-letters';
import '../effects/cinema-letters/style.css';
import { createFreshContent, FRESH_CONTENT_LINES } from '../effects/fresh-content';
import '../effects/fresh-content/style.css';
import { createFilmCards, FILM_CARDS } from '../effects/film-cards';
import '../effects/film-cards/style.css';

export interface ArchiveEffect {
  setProgress?(progress: number): void;
  refresh?(): void;
  destroy(): void;
}

export interface ArchiveEntry {
  id: string;
  title: string;
  steps: number;
  create(host: HTMLElement): ArchiveEffect;
}

export const repositoryUrl = 'https://github.com/zhenchur/web-effects-archive';
const freshContentRepetitions = 3;

// Each entry adds its navigation link and a scene in the document's scroll flow.
export const effects: readonly ArchiveEntry[] = [
  {
    id: 'cinema-letters',
    title: 'Эффект 1',
    steps: DEFAULT_WORDS.length - 1,
    create: host => createCinemaLetters(host),
  },
  {
    id: 'fresh-content',
    title: 'Эффект 2',
    steps: (FRESH_CONTENT_LINES.length * freshContentRepetitions - 1) * .3,
    create: host => createFreshContent(host, { repetitions: freshContentRepetitions }),
  },
  {
    id: 'film-cards-drag',
    title: 'Эффект 3',
    steps: 0,
    create: host => createFilmCards(host, { cards: FILM_CARDS, mode: 'drag', initialIndex: 3 }),
  },
  {
    id: 'film-cards-scroll',
    title: 'Эффект 4',
    steps: (FILM_CARDS.length - 1) * .65,
    create: host => createFilmCards(host, { cards: FILM_CARDS, mode: 'scroll' }),
  },
];
