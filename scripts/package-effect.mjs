import { build } from 'vite';
import { readFile, readdir, mkdir, writeFile, copyFile } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { deflateRawSync } from 'node:zlib';

const root = resolve(import.meta.dirname, '..');
const effect = join(root, 'effects/cinema-letters');
const output = join(root, 'public/downloads');
await mkdir(output, { recursive: true });
const result = await build({
  configFile: false, root, logLevel: 'warn',
  build: { write: false, minify: true, lib: { entry: join(effect, 'index.ts'), formats: ['es'], fileName: 'cinema-letters' } },
});
const bundle = (Array.isArray(result) ? result[0] : result).output.find(item => item.type === 'chunk');
if (!bundle) throw new Error('Effect bundle was not generated');
const files = [];
for (const name of (await readdir(effect)).sort()) {
  files.push({ name: name === 'README.md' ? 'README.md' : `effects/cinema-letters/${name}`, bytes: await readFile(join(effect, name)) });
}
const css = await readFile(join(effect, 'style.css'));
files.push({ name: 'demo/cinema-letters.js', bytes: Buffer.from(bundle.code) }, { name: 'demo/style.css', bytes: css });
files.push({ name: 'demo/index.html', bytes: await readFile(join(root, 'examples/cinema-letters.html')) });
files.push({ name: 'THIRD_PARTY.md', bytes: await readFile(join(root, 'THIRD_PARTY.md')) });
files.push({ name: 'package.json', bytes: Buffer.from(JSON.stringify({
  name: 'cinema-letters-effect', version: '1.0.0', private: true, type: 'module',
  scripts: { dev: 'vite --host 127.0.0.1 --open /demo/' },
  dependencies: { gsap: '3.15.0' }, devDependencies: { vite: '^6.4.3', typescript: '~5.9.3' },
}, null, 2)) });

// A deterministic, standard ZIP with UTF-8 names, CRC32 and Deflate entries.
// No local absolute paths, dependencies or development state enter the download.
const crcTable = Array.from({length: 256}, (_, n) => {
  for (let k = 0; k < 8; k++) n = n & 1 ? 0xedb88320 ^ (n >>> 1) : n >>> 1;
  return n >>> 0;
});
const crc32 = bytes => {
  let value = 0xffffffff;
  for (const byte of bytes) value = crcTable[(value ^ byte) & 255] ^ (value >>> 8);
  return (value ^ 0xffffffff) >>> 0;
};
const entries = [], directory = [];
let offset = 0;
for (const {name, bytes} of files) {
  const path = Buffer.from(`cinema-letters/${name}`);
  const compressed = deflateRawSync(bytes);
  const checksum = crc32(bytes);
  const local = Buffer.alloc(30);
  local.writeUInt32LE(0x04034b50); local.writeUInt16LE(20, 4);
  local.writeUInt16LE(0x800, 6); local.writeUInt16LE(8, 8);
  local.writeUInt16LE(33, 12); local.writeUInt32LE(checksum, 14);
  local.writeUInt32LE(compressed.length, 18); local.writeUInt32LE(bytes.length, 22);
  local.writeUInt16LE(path.length, 26);
  entries.push(local, path, compressed);
  const central = Buffer.alloc(46);
  central.writeUInt32LE(0x02014b50); central.writeUInt16LE(20, 4); central.writeUInt16LE(20, 6);
  central.writeUInt16LE(0x800, 8); central.writeUInt16LE(8, 10); central.writeUInt16LE(33, 14);
  central.writeUInt32LE(checksum, 16); central.writeUInt32LE(compressed.length, 20);
  central.writeUInt32LE(bytes.length, 24); central.writeUInt16LE(path.length, 28); central.writeUInt32LE(offset, 42);
  directory.push(central, path); offset += local.length + path.length + compressed.length;
}
const central = Buffer.concat(directory), end = Buffer.alloc(22);
end.writeUInt32LE(0x06054b50); end.writeUInt16LE(files.length, 8); end.writeUInt16LE(files.length, 10);
end.writeUInt32LE(central.length, 12); end.writeUInt32LE(offset, 16);
await writeFile(join(output, 'cinema-letters.zip'), Buffer.concat([...entries, central, end]));
await writeFile(join(output, 'cinema-letters.js'), bundle.code);
await copyFile(join(effect, 'style.css'), join(output, 'cinema-letters.css'));
console.log(`Cinema Letters: source + standalone demo packed (${files.length} files).`);
