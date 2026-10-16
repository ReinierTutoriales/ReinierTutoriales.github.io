import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access, readdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { createHash } from 'node:crypto';
import { compile } from 'svelte/compiler';

const catalog = JSON.parse(await readFile('src/lib/data/projects.json', 'utf8'));
const html = await readFile('build/index.html', 'utf8');

test('el HTML prerenderizado contiene el catálogo sin ejecutar JavaScript', () => {
  for (const p of [...catalog.projects, ...catalog.resources]) {
    assert.ok(html.includes(`href="https://github.com/ReinierTutoriales/${p.repo}"`), p.repo);
    assert.ok(html.includes(p.name), p.name);
  }
  assert.equal((html.match(/data-category=/g) || []).length, catalog.projects.length);
  assert.doesNotMatch(html, /<article[^>]*\bhidden(?:[\s=>])/);
  assert.equal((html.match(/<h1\b/g) || []).length, 1);
  assert.ok(html.includes('lang="es"'));
});
test('catálogo sin duplicados, clasificado y con un proyecto principal', () => {
  const repos = [...catalog.projects, ...catalog.resources].map(p => p.repo);
  assert.equal(new Set(repos).size, repos.length);
  assert.ok(repos.every(repo => /^[a-zA-Z0-9_.-]+$/.test(repo)));
  assert.equal(catalog.projects.filter(p => p.featured).length, 1);
  assert.ok(catalog.projects.every(p => ['windows','android'].includes(p.category) && p.summary && p.detail));
});
test('enlaces internos y activos prerenderizados existen', async () => {
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
  assert.equal(new Set(ids).size, ids.length);
  for (const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    const path = match[1];
    if (path.startsWith('#')) assert.ok(ids.includes(path.slice(1)), path);
    else if (!path.startsWith('https:')) {
      const local = new URL(path, 'https://reiniertutoriales.github.io/');
      if (local.hash && local.pathname === '/') assert.ok(ids.includes(local.hash.slice(1)), path);
      if (local.pathname !== '/') await access(resolve('build', local.pathname.replace(/^\//,'')));
    }
  }
  for (const path of ['build/404.html','build/robots.txt','build/sitemap.xml','build/.nojekyll']) await access(path);
  assert.equal(await readFile('build/404.html','utf8'), await readFile('build/not-found/index.html','utf8'));
  assert.ok((await readFile('build/404.html','utf8')).includes('noindex'));
});
test('CSP permite por hash los scripts de arranque y prohíbe scripts arbitrarios', () => {
  const csp = html.match(/http-equiv="content-security-policy" content="([^"]+)"/i)?.[1];
  assert.ok(csp, 'Falta la CSP');
  assert.ok(!csp.includes('unsafe-inline') && !csp.includes('unsafe-eval'));
  for (const match of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)) {
    if (match[1].includes('src=') || !match[2].trim()) continue;
    const hash = createHash('sha256').update(match[2]).digest('base64');
    assert.ok(csp.includes(hash), 'El arranque de SvelteKit quedaría bloqueado por la CSP');
  }
});
test('Svelte compila el catálogo en modo cliente con estado reactivo y accesibilidad', async () => {
  const source = await readFile('src/lib/components/ProjectCatalog.svelte','utf8');
  const compiled = compile(source, { filename: 'ProjectCatalog.svelte', generate: 'client', runes: true });
  assert.equal(compiled.warnings.length, 0);
  assert.ok(compiled.js.code.includes('aria-pressed'));
  assert.ok(compiled.js.code.includes('aria-live'));
  assert.ok(source.includes('hidden={!ready}'));
});
test('el bundle publicado se mantiene acotado y sin fuentes externas', async () => {
  let bytes = 0;
  async function walk(path) {
    for (const entry of await readdir(path, {withFileTypes:true})) {
      const name = `${path}/${entry.name}`;
      if (entry.isDirectory()) await walk(name);
      else if (/\.(js|css)$/.test(name)) bytes += (await readFile(name)).length;
    }
  }
  await walk('build/_app');
  assert.ok(bytes < 200 * 1024, `JS + CSS: ${bytes} bytes`);
  assert.doesNotMatch(html, /fonts\.googleapis|fonts\.gstatic/);
});
