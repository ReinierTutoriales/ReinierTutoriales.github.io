import { createSeo } from '#lib/seo.server.js';
import type { LayoutServerLoad } from './$types';

export const load = (({ url }) => ({ seo: createSeo(url.pathname) })) satisfies LayoutServerLoad;
