import { systems, siteSections } from '#lib/sections.js';
export const prerender = true;
export function GET() {
  const paths = ['/', ...siteSections.map(section => section.path), ...systems.map(system => `/sistemas/${system.slug}/`)];
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map(path => `<url><loc>https://reiniertutoriales.github.io${path}</loc></url>`).join('')}</urlset>`, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
