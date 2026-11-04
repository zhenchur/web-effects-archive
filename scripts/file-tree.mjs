import { copyFileSync, lstatSync, mkdirSync, readdirSync, rmdirSync, unlinkSync } from 'node:fs';
import { join } from 'node:path';

// Walk explicitly: native recursive filesystem operations are unreliable on
// the Windows/Node version used to build this archive. Never follow symlinks.
export function emptyDirectory(directory) {
  if (lstatSync(directory).isSymbolicLink()) throw new Error(`Refusing to empty a symlink: ${directory}`);
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory() && !entry.isSymbolicLink()) {
      emptyDirectory(path);
      rmdirSync(path);
    } else {
      unlinkSync(path);
    }
  }
}

export function copyDirectory(source, destination) {
  if (lstatSync(source).isSymbolicLink()) throw new Error(`Refusing to copy a symlink: ${source}`);
  mkdirSync(destination, { recursive: true });
  for (const entry of readdirSync(source, { withFileTypes: true })) {
    const path = join(source, entry.name);
    const target = join(destination, entry.name);
    if (entry.isSymbolicLink()) throw new Error(`Refusing to publish a symlink: ${path}`);
    if (entry.isDirectory()) copyDirectory(path, target);
    else if (entry.isFile()) copyFileSync(path, target);
    else throw new Error(`Unsupported build entry: ${path}`);
  }
}
