import { error } from '@sveltejs/kit';
import { guides } from '#lib/guide-catalog.js';
import { guideContent } from '#lib/guides.server.js';
export const entries = () => guides.map(guide => ({ slug: guide.slug }));
export function load({ params }: { params: { slug: string } }) {
  const guide = guides.find(guide => guide.slug === params.slug);
  const content = guideContent[params.slug];
  if (!guide || !content) error(404, 'Guía no encontrada');
  return { guide, content };
}
