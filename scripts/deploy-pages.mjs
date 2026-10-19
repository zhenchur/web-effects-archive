import { execFileSync } from 'node:child_process';
import { mkdtempSync, cpSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const git = (cwd, ...args) => execFileSync('git', args, { cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
if (git(root, 'status', '--porcelain')) throw new Error('Commit source changes before deploying.');
const remote = git(root, 'remote', 'get-url', 'origin');
const sourceCommit = git(root, 'rev-parse', 'HEAD');
const remoteHead = git(root, 'ls-remote', 'origin', 'refs/heads/main').split(/\s/)[0];
if (remoteHead !== sourceCommit) throw new Error('Push the current source commit to main before deploying.');
const staging = mkdtempSync(join(tmpdir(), 'web-effects-pages-'));
git(staging, 'init', '--initial-branch=gh-pages');
git(staging, 'config', 'user.name', git(root, 'config', 'user.name'));
git(staging, 'config', 'user.email', git(root, 'config', 'user.email'));
git(staging, 'remote', 'add', 'origin', remote);
if (git(root, 'ls-remote', 'origin', 'refs/heads/gh-pages')) {
  git(staging, 'fetch', '--depth=1', 'origin', 'gh-pages');
  git(staging, 'checkout', '-B', 'gh-pages', 'FETCH_HEAD');
  git(staging, 'rm', '-r', '--ignore-unmatch', '.');
}
cpSync(join(root, 'dist'), staging, { recursive: true });
writeFileSync(join(staging, '.nojekyll'), '');
writeFileSync(join(staging, 'deployment.json'), JSON.stringify({ sourceCommit }, null, 2));
git(staging, 'add', '.');
if (git(staging, 'status', '--porcelain')) {
  git(staging, 'commit', '-m', `Publish archive from ${sourceCommit.slice(0, 12)}`);
  git(staging, 'push', 'origin', 'HEAD:gh-pages');
}
console.log(`Published source ${sourceCommit}. Static branch: gh-pages.`);
