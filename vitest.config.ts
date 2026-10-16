import { fileURLToPath } from 'node:url';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [svelte({ configFile: false })],
  resolve: { conditions: ['browser'], alias: { '$app/state': fileURLToPath(new URL('./src/test/app-state.svelte.ts', import.meta.url)) } },
  test: {
    environment: 'jsdom',
    include: ['src/**/*.test.ts']
  }
});
