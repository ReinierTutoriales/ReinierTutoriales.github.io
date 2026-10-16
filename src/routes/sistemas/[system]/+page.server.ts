import { error } from '@sveltejs/kit';
import { systems } from '#lib/sections.js';
export const entries = () => systems.map(system => ({ system: system.slug }));
export function load({ params }: { params: { system: string } }) {
  const system = systems.find(system => system.slug === params.system);
  if (!system) error(404, 'Sistema no encontrado');
  return { system };
}
