import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access, readdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { createHash } from 'node:crypto';
import { compile } from 'svelte/compiler';

const catalog = JSON.parse(await readFile('src/lib/data/projects.json', 'utf8'));
const html = await readFile('build/index.html', 'utf8');

test('el HTML prerenderizado contiene el catálogo sin ejecutar JavaScript', () => {
  for (const p of catalog.resources) {
    const path = p.repo.startsWith('Mapear-puertos-USB-') ? '/guias/mapear-usb-desde-windows/' : `https://github.com/ReinierTutoriales/${p.repo}`;
    assert.ok(html.includes(`href="${path}"`), p.repo);
    assert.ok(html.includes(p.name), p.name);
  }
  for (const p of catalog.projects) assert.ok(html.includes(p.name), p.name);
  assert.ok(html.includes('href="/aplicaciones/velocitycopy/"'));
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
    if (match[1].includes('src=') || match[1].includes('application/ld+json') || !match[2].trim()) continue;
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

test('todas las secciones y sistemas tienen HTML propio y aparecen en el sitemap', async () => {
  const paths = ['sistemas','aplicaciones','herramientas','guias','sistemas/windows','sistemas/macos','sistemas/linux','sistemas/android-tv'];
  const sitemap = await readFile('build/sitemap.xml','utf8');
  for (const path of paths) {
    const page = await readFile(`build/${path}/index.html`,'utf8');
    assert.equal((page.match(/<h1\b/g) || []).length,1,path);
    assert.ok(sitemap.includes(`https://reiniertutoriales.github.io/${path}/`),path);
    assert.doesNotMatch(page,/\/threads\/|\/forums\//);
    assert.ok(page.includes('src="/theme.js"'));
  }
});

test('el tema arranca antes del contenido y tolera almacenamiento bloqueado', async () => {
  const vm = await import('node:vm');
  const listeners = new Map();
  const root = {dataset:{}};
  const context = {
    document:{documentElement:root,querySelector:()=>null},
    window:{
      matchMedia:()=>({matches:true,addEventListener(){}}),
      localStorage:{getItem(){throw new Error('Storage denied');},setItem(){throw new Error('Storage denied');}},
      addEventListener:(event,handler)=>listeners.set(event,handler)
    }
  };
  vm.runInNewContext(await readFile('static/theme.js','utf8'),context);
  assert.equal(root.dataset.theme,'dark');
  listeners.get('rt-theme-change')({detail:'light'});
  assert.equal(root.dataset.theme,'light');
  listeners.get('rt-theme-change')({detail:'invalid'});
  assert.equal(root.dataset.theme,'light');
  const template = await readFile('src/app.html','utf8');
  assert.ok(template.indexOf('/theme.js') < template.indexOf('%sveltekit.head%'));
});

test('las paletas mantienen contraste de texto de al menos 4.5:1', async () => {
  const css = await readFile('src/app.css','utf8');
  const extract = block => Object.fromEntries([...block.matchAll(/--([\w-]+):\s*(#[0-9a-f]+)/gi)].map(m => [m[1],m[2]]));
  const light = extract(css.match(/:root\s*\{([^}]+)\}/)[1]);
  const dark = {...light,...extract(css.match(/:root\[data-theme="dark"\]\s*\{([^}]+)\}/)[1])};
  function luminance(hex) {
    const full = hex.length === 4 ? '#' + [...hex.slice(1)].map(c => c+c).join('') : hex;
    const rgb = full.slice(1).match(/../g).map(c => parseInt(c,16)/255).map(c => c<=0.04045 ? c/12.92 : ((c+0.055)/1.055)**2.4);
    return rgb[0]*0.2126 + rgb[1]*0.7152 + rgb[2]*0.0722;
  }
  for (const [name,palette] of [['claro',light],['oscuro',dark]]) {
    for (const [fg,bg] of [['ink','paper'],['muted','paper'],['muted','soft'],['green','paper'],['button-ink','button'],['selected-ink','selected'],['feature-ink','feature'],['feature-muted','feature'],['feature-muted','feature-visual']]) {
      const values=[luminance(palette[fg]),luminance(palette[bg])].sort((a,b)=>b-a);
      const ratio=(values[0]+0.05)/(values[1]+0.05);
      assert.ok(ratio>=4.5,`${name}: ${fg}/${bg} = ${ratio.toFixed(2)}`);
    }
  }
});

test('SEO completo y único en las 17 páginas indexables', async () => {
  const sitemap = await readFile('build/sitemap.xml','utf8');
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
  assert.equal(urls.length,17);
  const titles = new Set(); const descriptions = new Set();
  for (const url of urls) {
    const path = new URL(url).pathname;
    const page = await readFile(resolve('build',path.slice(1),'index.html'),'utf8');
    const head = page.match(/<head>([\s\S]*?)<\/head>/)[1];
    const title = head.match(/<title>([^<]+)<\/title>/)[1];
    const description = head.match(/name="description" content="([^"]+)"/)[1];
    assert.equal((head.match(/<title>/g)||[]).length,1,url);
    assert.equal((head.match(/rel="canonical"/g)||[]).length,1,url);
    assert.ok(head.includes(`rel="canonical" href="${url}"`),url);
    assert.ok(head.includes(`property="og:url" content="${url}"`),url);
    assert.ok(head.includes('name="twitter:image"'),url);
    assert.ok(description.length>70,url);
    assert.ok(!titles.has(title),`Título duplicado: ${url}`);titles.add(title);
    assert.ok(!descriptions.has(description),`Descripción duplicada: ${url}`);descriptions.add(description);
    assert.doesNotMatch(head,/noindex/);
    const json = head.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1];
    const graph = JSON.parse(json)['@graph'];
    assert.ok(graph.find(node=>node['@type']==='WebSite'));
    assert.equal(graph.find(node=>node['@type']==='WebPage').url,url);
    if(path!=='/') {
      const crumbs = graph.find(node=>node['@type']==='BreadcrumbList').itemListElement;
      assert.equal(crumbs.at(-1).item,url);
      assert.ok(page.includes('aria-label="Ruta de navegación"'));
    }
    assert.doesNotMatch(json,/aggregateRating|"offers"|FAQPage|SearchAction/);
  }
});


test('navegación activa y destinos internos válidos en todas las páginas públicas', async () => {
  const sitemap = await readFile('build/sitemap.xml','utf8');
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
  for (const url of urls) {
    const page = await readFile(resolve('build',new URL(url).pathname.slice(1),'index.html'),'utf8');
    const nav = page.match(/<nav\b[^>]*aria-label="Navegación principal"[^>]*>([\s\S]*?)<\/nav>/)[1];
    const path = new URL(url).pathname;
    const expected = path === '/' ? 0 : 1;
    assert.equal((nav.match(/aria-current=/g)||[]).length,expected,url);
    if (expected) {
      const rootPath = '/' + path.split('/')[1] + '/';
      const current = path === rootPath ? 'page' : 'location';
      assert.ok(nav.includes(`href="${rootPath}" aria-current="${current}"`),url);
    }
    const ids = [...page.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
    assert.equal(new Set(ids).size,ids.length,url);
    for (const [,href] of page.matchAll(/\bhref="([^"]+)"/g)) {
      if (!href.startsWith('/') && !href.startsWith('#')) continue;
      const target = new URL(href,url);
      const isPage = target.pathname.endsWith('/');
      const file = resolve('build',target.pathname.slice(1),...(isPage ? ['index.html'] : []));
      await access(file);
      if (target.hash) {
        const targetHtml = target.pathname === path ? page : await readFile(file,'utf8');
        assert.ok(targetHtml.includes(`id="${target.hash.slice(1)}"`),`${url} → ${href}`);
      }
    }
  }
});

test('guías, comparación y fichas ofrecen contenido útil sin JavaScript', async () => {
  const applications = await readFile('build/aplicaciones/index.html','utf8');
  assert.ok(applications.includes('Comparación de aplicaciones'));
  assert.equal((applications.match(/scope="row"/g)||[]).length,6);
  for (const slug of ['velocitycopy','repartocopier','nf-dns-vpn','vireolumatv','w11downloaderpro','colorfix']) {
    const page = await readFile(`build/aplicaciones/${slug}/index.html`,'utf8');
    for (const text of ['Requisitos','Cómo empezar','Compatibilidad y alcance','Descargas y documentación','README revisado']) assert.ok(page.includes(text),`${slug}: ${text}`);
    assert.match(page, /<time datetime="\d{4}-\d{2}-\d{2}"/);
  }
  for (const slug of ['mapear-usb-desde-windows','descargas-reanudables-w11downloaderpro']) {
    const page = await readFile(`build/guias/${slug}/index.html`,'utf8');
    for (const text of ['En esta guía','Antes de empezar','Resolver problemas','Fuentes y documentación']) assert.ok(page.includes(text),`${slug}: ${text}`);
    assert.ok(page.length>10000);
  }
});

test('cada página limita el JavaScript inicial a 112 KiB', async () => {
  const { execFile } = await import('node:child_process');
  const { promisify } = await import('node:util');
  const { stdout } = await promisify(execFile)(process.execPath,['scripts/asset-sizes.mjs']);
  const report = JSON.parse(stdout);
  assert.equal(report.pages.length,17);
  for (const page of report.pages) {
    assert.ok(page.preloaded_js_bytes > 0,page.path);
    assert.ok(page.preloaded_js_bytes <= 112*1024,`${page.path}: ${page.preloaded_js_bytes} bytes de JS inicial`);
  }
});

test('los artículos exponen autor y fechas visibles, y lastmod coincide con su modificación', async () => {
  const sitemap=await readFile('build/sitemap.xml','utf8');
  const urls=[...sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)];
  for (const [,entry] of urls) {
    const url=entry.match(/<loc>([^<]+)<\/loc>/)[1];
    const path=new URL(url).pathname;
    const page=await readFile(resolve('build',path.slice(1),'index.html'),'utf8');
    const graph=JSON.parse(page.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1])['@graph'];
    const article=graph.find(node=>node['@type']==='Article');
    if(path.startsWith('/guias/') && path!=='/guias/') {
      assert.ok(article,url);
      assert.ok(page.includes('Por ReinierTutoriales'),url);
      assert.ok(page.includes(`datetime="${article.datePublished}"`),url);
      assert.ok(page.includes(`datetime="${article.dateModified}"`),url);
      assert.ok(entry.includes(`<lastmod>${article.dateModified}</lastmod>`),url);
      assert.ok(page.includes('property="og:type" content="article"'),url);
    } else {
      assert.ok(!article,url);
      assert.ok(!entry.includes('<lastmod>'),url);
    }
  }
});
