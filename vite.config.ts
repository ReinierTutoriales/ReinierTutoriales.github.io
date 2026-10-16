import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit({
    adapter: adapter({ strict: true }),
    paths: { base: '', relative: false },
    prerender: { entries: ['*', '/sitemap.xml'] },
    csp: {
      mode: 'hash',
      directives: {
        'default-src': ['self'],
        'script-src': ['self'],
        'style-src': ['self'],
        'img-src': ['self'],
        'font-src': ['self'],
        'connect-src': ['self'],
        'object-src': ['none'],
        'base-uri': ['none'],
        'form-action': ['none']
      }
    }
  })]
});
