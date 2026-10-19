export interface ArchiveEntry {
  id: string;
  number: string;
  title: string;
  description: string;
  category: string;
  tags: readonly string[];
  version: string;
  sourcePath: string;
  downloadPath: string;
}

export const repositoryUrl = 'https://github.com/zhenchur/web-effects-archive';

// Add a registry entry and its demo adapter when another effect is ready.
export const effects: readonly ArchiveEntry[] = [
  {
    id: 'cinema-letters',
    number: '001',
    title: 'Cinema letters',
    description: 'Объёмная смена слов с поворотом, фейдом и последовательным движением букв.',
    category: 'Типографика',
    tags: ['CSS 3D', 'GSAP', 'Scroll'],
    version: '1.0.0',
    sourcePath: 'effects/cinema-letters',
    downloadPath: 'downloads/cinema-letters.zip',
  },
];
