import { existsSync, realpathSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { emptyDirectory } from './file-tree.mjs';

const root = realpathSync(resolve(import.meta.dirname, '..'));
const output = join(root, 'dist');
if (existsSync(output)) {
  // Resolve before removal so a redirected output folder cannot escape this project.
  if (relative(root, realpathSync(output)) !== 'dist') throw new Error('Build output must be the project dist directory.');
  emptyDirectory(output);
}
