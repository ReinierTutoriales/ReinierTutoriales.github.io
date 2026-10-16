import { afterEach, expect, test } from 'vitest';
import { cleanup, render, screen, within, waitFor } from '@testing-library/svelte';
import { page } from '../../test/app-state.svelte';
import Header from './Header.svelte';
afterEach(cleanup);

test('el menú sigue los cambios de ruta y distingue página, sección e inicio', async () => {
  page.url = new URL('https://reiniertutoriales.github.io/aplicaciones/');
  render(Header);
  const nav = screen.getByRole('navigation', { name:'Navegación principal' });
  const applications = within(nav).getByRole('link', { name:'Aplicaciones' });
  expect(applications.getAttribute('aria-current')).toBe('page');
  page.url = new URL('https://reiniertutoriales.github.io/aplicaciones/velocitycopy/');
  await waitFor(() => expect(applications.getAttribute('aria-current')).toBe('location'));
  page.url = new URL('https://reiniertutoriales.github.io/guias/mapear-usb-desde-windows/');
  await waitFor(() => expect(within(nav).getByRole('link', { name:'Guías' }).getAttribute('aria-current')).toBe('location'));
  expect(applications.hasAttribute('aria-current')).toBe(false);
  page.url = new URL('https://reiniertutoriales.github.io/');
  await waitFor(() => expect(nav.querySelector('[aria-current]')).toBeNull());
  page.url = new URL('https://reiniertutoriales.github.io/aplicaciones-otra/');
  await waitFor(() => expect(nav.querySelector('[aria-current]')).toBeNull());
});
