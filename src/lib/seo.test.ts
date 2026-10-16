import { expect, test } from 'vitest';
import { safeJsonLd, pageMetadata, publicPages, structuredData, createSeo } from './seo.server';

test('JSON-LD conserva el texto y no permite cerrar el bloque script', () => {
  const value = { name: '</script><img src=x onerror=alert(1)>' };
  const serialized = safeJsonLd(value);
  expect(serialized).not.toContain('<');
  expect(JSON.parse(serialized)).toEqual(value);
});
test('cada URL pública tiene una sola identidad canónica y rechaza rutas desconocidas', () => {
  expect(new Set(publicPages.map(p => p.path)).size).toBe(publicPages.length);
  expect(() => pageMetadata('/ruta-inventada/')).toThrow();
  expect(pageMetadata('/aplicaciones/velocitycopy/').crumbs.map(c => c.name)).toEqual(['Inicio','Aplicaciones','VelocityCopy']);
});

test('solo las guías tienen Article, fechas editoriales y autor coherente', () => {
  for (const page of publicPages) {
    const graph = structuredData(page.path)['@graph'];
    const article = graph.find(node => node['@type'] === 'Article');
    const isGuide = page.path.startsWith('/guias/') && page.path !== '/guias/';
    expect(Boolean(article)).toBe(isGuide);
    if (article) {
      expect(article.datePublished).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(article.dateModified).toBe(page.modifiedAt);
      expect(article.author).toEqual({'@id':'https://reiniertutoriales.github.io/#author'});
      expect(article.mainEntityOfPage).toEqual({'@id':`https://reiniertutoriales.github.io${page.path}#webpage`});
    }
  }
  expect(createSeo('/not-found/')).toBeNull();
  expect(createSeo('/ruta-inventada/')).toBeNull();
});
