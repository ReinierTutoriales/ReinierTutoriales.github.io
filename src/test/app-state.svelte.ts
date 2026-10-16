import type { SeoData } from '../lib/seo.server.js';
// Test-only replacement for SvelteKit's reactive route state.
export const page = $state({ url: new URL('https://reiniertutoriales.github.io/'), data: { seo:null as SeoData } });
