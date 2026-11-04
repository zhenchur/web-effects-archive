import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, readFileSync, readdirSync, rmdirSync, symlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { copyDirectory, emptyDirectory } from '../scripts/file-tree.mjs';

test('build tree copying preserves files and staging metadata; cleanup removes stale nested output', () => {
  const root = mkdtempSync(join(tmpdir(), 'archive-tree-test-'));
  try {
    const source = join(root, 'source');
    const destination = join(root, 'destination');
    mkdirSync(join(source, 'assets'), { recursive: true });
    mkdirSync(join(destination, '.git'), { recursive: true });
    writeFileSync(join(source, 'assets', 'bundle.js'), 'current bundle');
    writeFileSync(join(destination, '.git', 'HEAD'), 'staging metadata');
    copyDirectory(source, destination);
    assert.equal(readFileSync(join(destination, 'assets', 'bundle.js'), 'utf8'), 'current bundle');
    assert.equal(readFileSync(join(destination, '.git', 'HEAD'), 'utf8'), 'staging metadata');
    emptyDirectory(source);
    assert.deepEqual(readdirSync(source), []);
  } finally {
    emptyDirectory(root);
    rmdirSync(root);
  }
});

test('build cleanup never traverses directory links and deployment rejects linked content', () => {
  const root = mkdtempSync(join(tmpdir(), 'archive-link-test-'));
  try {
    const output = join(root, 'dist');
    const protectedDirectory = join(root, 'protected');
    mkdirSync(output);
    mkdirSync(protectedDirectory);
    writeFileSync(join(protectedDirectory, 'keep.txt'), 'untouched');
    const link = join(output, 'external');
    symlinkSync(protectedDirectory, link, process.platform === 'win32' ? 'junction' : 'dir');
    assert.throws(() => emptyDirectory(link), /symlink/);
    assert.throws(() => copyDirectory(output, join(root, 'publish')), /symlink/);
    emptyDirectory(output);
    assert.equal(readFileSync(join(protectedDirectory, 'keep.txt'), 'utf8'), 'untouched');
    assert.deepEqual(readdirSync(output), []);
  } finally {
    emptyDirectory(root);
    rmdirSync(root);
  }
});
