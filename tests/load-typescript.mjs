import { readFile } from 'node:fs/promises';
import ts from 'typescript';

/** Load the actual module in memory; no emitted files or production changes. */
export async function loadTypeScript(url, testOnlyExports = []) {
  const moduleCache = new Map();
  async function compile(moduleUrl, extraExports = []) {
    const key = `${moduleUrl}|${extraExports.join(',')}`;
    if (moduleCache.has(key)) return moduleCache.get(key);
    const source = await readFile(moduleUrl, 'utf8');
    const testingExports = extraExports.length ? `\nexport { ${extraExports.join(', ')} };` : '';
    let javascript = ts.transpileModule(source + testingExports, {
      compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
      fileName: moduleUrl.pathname,
    }).outputText;
    for (const specifier of new Set([...javascript.matchAll(/from\s*['"]([^'"]+)['"]/g)].map(match => match[1]))) {
      const resolved = specifier.startsWith('.')
        ? await compile(new URL(`${specifier}.ts`, moduleUrl))
        : import.meta.resolve(specifier);
      javascript = javascript.split(`'${specifier}'`).join(JSON.stringify(resolved));
      javascript = javascript.split(`"${specifier}"`).join(JSON.stringify(resolved));
    }
    const result = `data:text/javascript;base64,${Buffer.from(javascript).toString('base64')}`;
    moduleCache.set(key, result);
    return result;
  }
  return import(await compile(url, testOnlyExports));
}
