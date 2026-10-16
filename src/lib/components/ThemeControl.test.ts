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
  const control = screen.getByRole('combobox', { name: 'Tema de apariencia' }) as HTMLSelectElement;
  await waitFor(() => expect(control.disabled).toBe(false));
  expect(control.value).toBe('dark');
  await fireEvent.change(control, { target: { value: 'light' } });
  expect(document.documentElement.dataset.theme).toBe('light');
  expect(window.localStorage.getItem('rt-theme')).toBe('light');
  await fireEvent.change(control, { target: { value: 'system' } });
  media.matches = true;
  onSystemChange?.();
  expect(document.documentElement.dataset.theme).toBe('dark');
  window.dispatchEvent(new StorageEvent('storage', { key: 'rt-theme', newValue: 'light' }));
  await waitFor(() => expect(control.value).toBe('light'));
  expect(document.documentElement.dataset.theme).toBe('light');
});
