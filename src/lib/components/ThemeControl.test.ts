import { afterEach, expect, test, vi } from 'vitest';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/svelte';
import ThemeControl from './ThemeControl.svelte';
import bootstrap from '../../../static/theme.js?raw';

afterEach(() => { cleanup(); vi.unstubAllGlobals(); window.localStorage.clear(); });

test('ofrece solo claro y oscuro, persiste la elección y sincroniza otras pestañas', async () => {
  const media = { matches: false };
  vi.stubGlobal('matchMedia', () => media);
  window.localStorage.setItem('rt-theme', 'dark');
  new Function(bootstrap)();
  expect(document.documentElement.dataset.theme).toBe('dark');
  render(ThemeControl);

  const darkBtn = screen.getByRole('radio', { name: 'Oscuro' });
  const lightBtn = screen.getByRole('radio', { name: 'Claro' });
  expect(screen.getAllByRole('radio')).toHaveLength(2);
  expect(screen.queryByRole('radio', { name: 'Auto' })).toBeNull();

  await waitFor(() => expect(darkBtn.getAttribute('aria-checked')).toBe('true'));
  expect(lightBtn.getAttribute('aria-checked')).toBe('false');
  expect(darkBtn.tabIndex).toBe(0);
  expect(lightBtn.tabIndex).toBe(-1);
  darkBtn.focus();
  await fireEvent.keyDown(darkBtn, { key: 'ArrowRight' });
  await waitFor(() => expect(lightBtn.getAttribute('aria-checked')).toBe('true'));
  expect(document.activeElement).toBe(lightBtn);
  expect(lightBtn.tabIndex).toBe(0);
  expect(document.documentElement.dataset.theme).toBe('light');
  await fireEvent.keyDown(lightBtn, { key: 'ArrowLeft' });
  await waitFor(() => expect(darkBtn.getAttribute('aria-checked')).toBe('true'));
  expect(document.activeElement).toBe(darkBtn);


  await fireEvent.click(lightBtn);
  expect(document.documentElement.dataset.theme).toBe('light');
  expect(window.localStorage.getItem('rt-theme')).toBe('light');
  await waitFor(() => expect(lightBtn.getAttribute('aria-checked')).toBe('true'));

  await fireEvent.click(darkBtn);
  expect(document.documentElement.dataset.theme).toBe('dark');
  expect(window.localStorage.getItem('rt-theme')).toBe('dark');

  window.dispatchEvent(new StorageEvent('storage', { key: 'rt-theme', newValue: 'light' }));
  await waitFor(() => expect(lightBtn.getAttribute('aria-checked')).toBe('true'));
  expect(document.documentElement.dataset.theme).toBe('light');
});
