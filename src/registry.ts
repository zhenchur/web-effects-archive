import { createCinemaLetters, DEFAULT_WORDS, type CinemaLetters } from '../effects/cinema-letters';
import '../effects/cinema-letters/style.css';

export interface ArchiveEntry {
  id: string;
  title: string;
  steps: number;
  create(host: HTMLElement): CinemaLetters;
}

export const repositoryUrl = 'https://github.com/zhenchur/web-effects-archive';

// Each entry adds its navigation link and a scene in the document's scroll flow.
export const effects: readonly ArchiveEntry[] = [
  {
    id: 'cinema-letters',
    title: 'Эффект 1',
    steps: DEFAULT_WORDS.length - 1,
    create: host => createCinemaLetters(host),
  },
];
