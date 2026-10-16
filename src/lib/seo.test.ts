import { expect, test } from 'vitest';
import { safeJsonLd, pageMetadata, publicPages } from './seo';

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
