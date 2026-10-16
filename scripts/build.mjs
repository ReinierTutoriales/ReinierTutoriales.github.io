import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';

export const root = fileURLToPath(new URL('../', import.meta.url));
export const escapeHTML = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function validateData(data) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(data.reviewedAt)) throw new Error('Fecha de revisión inválida');
  const names = new Set();
  for (const p of [...data.projects, ...data.resources]) {
    if (!/^[A-Za-z0-9_.-]+$/.test(p.repo) || names.has(p.repo)) throw new Error(`Repositorio inválido o duplicado: ${p.repo}`);
    names.add(p.repo);
    if (!p.name || !p.summary) throw new Error(`Contenido incompleto: ${p.repo}`);
  }
  if (data.projects.filter(p => p.featured).length !== 1) throw new Error('Se requiere un único proyecto principal');
  for (const p of data.projects) {
    if (!['windows','android'].includes(p.category) || !p.stack || !p.kind || !p.detail || !p.platform) throw new Error(`Proyecto incompleto: ${p.repo}`);
  }
}
const url = p => `https://github.com/ReinierTutoriales/${p.repo}`;
export async function render() {
  const data = JSON.parse(await readFile(resolve(root, 'data/projects.json'), 'utf8'));
  validateData(data);
  const projects = data.projects.map((p, i) => `
    <article class="project${p.featured ? ' featured' : ''}" data-category="${p.category}">
      <div class="project-body">
        <div class="project-meta"><span>${String(i + 1).padStart(2, '0')} / ${escapeHTML(p.platform)}</span><span class="kind">${escapeHTML(p.kind)}</span></div>
        <h3>${escapeHTML(p.name)}</h3>
        <p class="project-summary">${escapeHTML(p.summary)}</p>
        <p class="project-detail">${escapeHTML(p.detail)}</p>
        <p class="stack">${escapeHTML(p.stack)}</p>
        <a class="project-link" href="${url(p)}">Explorar ${escapeHTML(p.name)} <span aria-hidden="true">↗</span></a>
      </div>${p.featured ? '\n      <figure class="product-visual"><img src="assets/velocitycopy.webp" alt="Interfaz de VelocityCopy: progreso de transferencia, velocidad y controles de copia" width="461" height="176" fetchpriority="high"><figcaption>Interfaz durante el desarrollo. Las cifras de la captura son ilustrativas.</figcaption></figure>' : ''}
    </article>`).join('\n');
  const resources = data.resources.map(p => `
    <li><a href="${url(p)}"><span><span class="resource-type">${escapeHTML(p.type)}</span><strong>${escapeHTML(p.name)}</strong><span class="resource-summary">${escapeHTML(p.summary)}</span></span><span aria-hidden="true">↗</span></a></li>`).join('\n');
  const template = await readFile(resolve(root, 'src/index.html'), 'utf8');
  return template.replace('          <!-- PROJECTS -->', projects).replace('        <!-- RESOURCES -->', resources);
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await writeFile(resolve(root, 'index.html'), await render());
  console.log('index.html generado a partir de src/index.html y data/projects.json');
}
