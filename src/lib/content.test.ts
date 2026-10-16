import { expect, test } from 'vitest';
import { projectEditorial } from './project-editorial.server';
import { projectDetails } from './project-details';
import { guides } from './guide-catalog';
import { guideContent } from './guides.server';

test('cada proyecto tiene revisión trazable y publica solo enlaces de paquetes comprobados', () => {
  expect(Object.keys(projectEditorial).sort()).toEqual(Object.keys(projectDetails).sort());
  for (const [repo, data] of Object.entries(projectEditorial)) {
    expect(data.reviewedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(data.requirements.length).toBeGreaterThan(0);
    expect(data.start.length).toBeGreaterThan(1);
    expect(data.sources[0].url).toMatch(new RegExp(`/ReinierTutoriales/${repo}/blob/[a-f0-9]{40}/README.md$`));
    if (data.release) {
      const url = new URL(data.release.url);
      expect(url.hostname).toBe('github.com');
      expect(decodeURIComponent(url.pathname)).toBe(`/ReinierTutoriales/${repo}/releases/tag/${data.release.tag}`);
      if (data.release.prerelease) expect(data.status).toMatch(/preliminar/i);
    }
  }
});

test('cada guía tiene contenido, secciones únicas y vínculos a sus fuentes', () => {
  expect(Object.keys(guideContent).sort()).toEqual(guides.map(g => g.slug).sort());
  for (const guide of guides) {
    const data = guideContent[guide.slug];
    expect(data.requirements.length).toBeGreaterThan(1);
    expect(data.sources.some(source => source.url.includes(guide.sourceRepo))).toBe(true);
    expect(new Set(data.sections.map(s => s.id)).size).toBe(data.sections.length);
    expect(data.related.length).toBeGreaterThan(0);
  }
});
