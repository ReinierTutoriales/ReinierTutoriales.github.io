import { afterEach, expect, test } from 'vitest';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/svelte';
import ProjectCatalog from './ProjectCatalog.svelte';
import { projects } from '../catalog';

afterEach(cleanup);

test('filtra los componentes reales y restaura el catálogo sin perder selección ni anuncio', async () => {
  const { container } = render(ProjectCatalog);
  const controls = screen.getByRole('group', { name: 'Filtrar proyectos por plataforma' });
  await waitFor(() => expect(controls.hidden).toBe(false));
  for (const [label, category] of [['Android TV', 'android'], ['Windows', 'windows'], ['Todos', 'all']]) {
    const button = screen.getByRole('button', { name: label });
    button.focus();
    await fireEvent.click(button);
    expect(document.activeElement).toBe(button);
    const count = projects.filter(p => category === 'all' || p.category === category).length;
    expect(container.querySelectorAll('article:not([hidden])')).toHaveLength(count);
    expect(button.getAttribute('aria-pressed')).toBe('true');
    expect(container.querySelectorAll('button[aria-pressed="true"]')).toHaveLength(1);
    expect(screen.getByRole('status').textContent).toBe(`${count} proyectos: ${label}.`);
    expect(container.querySelectorAll('article')).toHaveLength(projects.length);
  }
});
