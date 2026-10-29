import { afterEach, expect, test, vi } from 'vitest';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/svelte';
import ThemeControl from './ThemeControl.svelte';
import bootstrap from '../../../static/theme.js?raw';

afterEach(() => { cleanup(); vi.unstubAllGlobals(); window.localStorage.clear(); });

test('carga la elección guardada, cambia temas, sigue el sistema y sincroniza otras pestañas', async () => {
  let onSystemChange: (() => void) | undefined;
  const media = { matches: false, addEventListener: (_: string, callback: () => void) => { onSystemChange = callback; } };
  vi.stubGlobal('matchMedia', () => media);
  window.localStorage.setItem('rt-theme', 'dark');
  new Function(bootstrap)();
  expect(document.documentElement.dataset.theme).toBe('dark');
  render(ThemeControl);

  const darkBtn = screen.getByRole('radio', { name: 'Oscuro' });
  const lightBtn = screen.getByRole('radio', { name: 'Claro' });
  const systemBtn = screen.getByRole('radio', { name: 'Auto' });

  await waitFor(() => expect(darkBtn.getAttribute('aria-checked')).toBe('true'));
  expect(lightBtn.getAttribute('aria-checked')).toBe('false');
  expect(darkBtn.tabIndex).toBe(0);
  expect(lightBtn.tabIndex).toBe(-1);
  darkBtn.focus();
  await fireEvent.keyDown(darkBtn, { key: 'ArrowRight' });
  await waitFor(() => expect(systemBtn.getAttribute('aria-checked')).toBe('true'));
  expect(document.activeElement).toBe(systemBtn);
  expect(systemBtn.tabIndex).toBe(0);
  expect(document.documentElement.dataset.themePreference).toBe('system');
  await fireEvent.keyDown(systemBtn, { key: 'ArrowLeft' });
  await waitFor(() => expect(darkBtn.getAttribute('aria-checked')).toBe('true'));
  expect(document.activeElement).toBe(darkBtn);


  await fireEvent.click(lightBtn);
  expect(document.documentElement.dataset.theme).toBe('light');
  expect(window.localStorage.getItem('rt-theme')).toBe('light');
  await waitFor(() => expect(lightBtn.getAttribute('aria-checked')).toBe('true'));

  await fireEvent.click(systemBtn);
  media.matches = true;
  onSystemChange?.();
  expect(document.documentElement.dataset.theme).toBe('dark');

  window.dispatchEvent(new StorageEvent('storage', { key: 'rt-theme', newValue: 'light' }));
  await waitFor(() => expect(lightBtn.getAttribute('aria-checked')).toBe('true'));
  expect(document.documentElement.dataset.theme).toBe('light');
});
