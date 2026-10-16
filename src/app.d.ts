import type { SeoData } from './lib/seo.server.js';

declare global {
  namespace App {
    interface PageData { seo: SeoData }
  }
}
export {};
