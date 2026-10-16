import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { resolve } from 'node:path';
import vm from 'node:vm';
import { root, render, escapeHTML, validateData } from './build.mjs';
const html = await readFile(resolve(root, 'index.html'), 'utf8');
const data = JSON.parse(await readFile(resolve(root, 'data/projects.json'), 'utf8'));

test('la página publicada coincide con la fuente y el catálogo', async () => {
  assert.equal(html, await render(), 'Ejecuta npm run build antes de guardar los cambios');
});
test('todos los proyectos son visibles sin JavaScript y enlazan a su repositorio', () => {
  for (const p of [...data.projects, ...data.resources]) assert.ok(html.includes(`href="https://github.com/ReinierTutoriales/${p.repo}"`));
  assert.equal((html.match(/data-category=/g) || []).length, data.projects.length);
  assert.doesNotMatch(html, /<article[^>]*\bhidden\b/);
  assert.doesNotMatch(html, /fetch\(|fonts\.google|\son[a-z]+\s*=/);
});
test('los identificadores son únicos y los enlaces locales resuelven', async () => {
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
  assert.equal(new Set(ids).size, ids.length);
  for (const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    const path = match[1];
    if (path.startsWith('#')) assert.ok(ids.includes(path.slice(1)), `Ancla ausente: ${path}`);
    else if (!path.startsWith('https:')) await access(resolve(root, path));
  }
  assert.equal((html.match(/<h1\b/g) || []).length, 1);
  assert.ok(html.includes('lang="es"'));
  assert.ok(html.includes('Saltar al contenido'));
});
test('el catálogo rechaza duplicados y categorías desconocidas; el texto se escapa', () => {
  const duplicate = structuredClone(data); duplicate.projects.push(duplicate.projects[0]);
  assert.throws(() => validateData(duplicate), /duplicado/);
  const invalid = structuredClone(data); invalid.projects[0].category = 'otro';
  assert.throws(() => validateData(invalid), /incompleto/);
  assert.equal(escapeHTML('<a x="y">&\''), '&lt;a x=&quot;y&quot;&gt;&amp;&#39;');
});
test('presupuesto de código: HTML, CSS y JS por debajo de 40 KiB en conjunto', async () => {
  const files = await Promise.all(['index.html','assets/site.css','assets/site.js'].map(p => readFile(resolve(root, p))));
  assert.ok(files.reduce((total, f) => total + f.length, 0) < 40 * 1024);
});
test('el filtro cambia visibilidad, selección y anuncio; todos restaura el catálogo', async () => {
  let onClick;
  const buttons = ['all','windows','android'].map(filter => ({dataset:{filter},textContent:filter,pressed:null,setAttribute(name,value){this.pressed=value;}}));
  const controls = {hidden:true, addEventListener(name,fn){onClick=fn;}, contains(el){return buttons.includes(el);}, querySelectorAll(){return buttons;}};
  const projects = data.projects.map(p => ({dataset:{category:p.category},hidden:false}));
  const status = {textContent:''}; const year={textContent:''};
  const document={querySelector(selector){return {'#filters':controls,'#filter-status':status,'#year':year}[selector];},querySelectorAll(){return projects;}};
  vm.runInNewContext(await readFile(resolve(root,'assets/site.js'),'utf8'), {document,Date});
  assert.equal(controls.hidden,false);
  for (const button of [buttons[2],buttons[1],buttons[0]]) {
    onClick({target:{closest(){return button;}}});
    const expected = data.projects.filter(p => button.dataset.filter==='all' || p.category===button.dataset.filter).length;
    assert.equal(projects.filter(p => !p.hidden).length,expected);
    assert.equal(button.pressed,'true');
    assert.equal(buttons.filter(b => b.pressed==='true').length,1);
    assert.ok(status.textContent.startsWith(String(expected)));
  }
  onClick({target:{closest(){return null;}}});
  assert.equal(year.textContent,String(new Date().getFullYear()));
});
