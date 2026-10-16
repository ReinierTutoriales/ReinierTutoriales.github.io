import { afterEach, expect, test } from 'vitest';
import { cleanup, render, waitFor, screen } from '@testing-library/svelte';
import { createSeo } from '../seo.server';
import { page } from '../../test/app-state.svelte';
import Seo from './Seo.svelte';
import Breadcrumbs from './Breadcrumbs.svelte';
afterEach(cleanup);

test('actualiza el head al cambiar de página y no deja metadatos anteriores en 404', async () => {
  const { rerender } = render(Seo, { metadata:createSeo('/aplicaciones/velocitycopy/') });
  await waitFor(() => expect(document.title).toContain('VelocityCopy'));
  await rerender({ metadata:createSeo('/guias/mapear-usb-desde-windows/') });
  await waitFor(() => expect(document.title).toContain('Mapeo USB'));
  expect(document.head.querySelectorAll('link[rel="canonical"]')).toHaveLength(1);
  expect(document.head.querySelector('meta[property="og:type"]')?.getAttribute('content')).toBe('article');
  expect(document.head.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe('https://reiniertutoriales.github.io/guias/mapear-usb-desde-windows/');
  const graph=JSON.parse(document.head.querySelector('script[type="application/ld+json"]')!.textContent!)['@graph'];
  expect(graph.some((node:Record<string,unknown>) => node['@type']==='Article')).toBe(true);
  await rerender({ metadata:null });
  await waitFor(() => expect(document.head.querySelector('link[rel="canonical"]')).toBeNull());
  expect(document.head.querySelector('script[type="application/ld+json"]')).toBeNull();
});

test('las migas siguen el SEO de la ruta actual al navegar entre aplicaciones y guías', async () => {
  page.data.seo=createSeo('/aplicaciones/velocitycopy/');
  render(Breadcrumbs);
  expect(screen.getByText('VelocityCopy').getAttribute('aria-current')).toBe('page');
  page.data.seo=createSeo('/guias/mapear-usb-desde-windows/');
  await waitFor(() => expect(screen.getByText('Mapeo USB desde Windows').getAttribute('aria-current')).toBe('page'));
  expect(screen.queryByText('VelocityCopy')).toBeNull();
  expect(screen.getByRole('link',{ name:'Guías' }).getAttribute('href')).toBe('/guias/');
});
