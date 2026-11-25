/* ReinierTutoriales · Service Worker.
 * Estrategia conservadora para un sitio estático prerenderizado:
 *  - network-first para navegaciones (evita servir HTML obsoleto en caché),
 *  - cache-first para activos con hash (inmutables) y para el que falle la red,
 *  - sin shell SPA: cada ruta es una página HTML real.
 * El manifest solo se usa en producción (el desarrollo no registra el SW).
 */
'use strict';

const VERSION = 'rt-v1';
const SHELL_CACHE = `${VERSION}-shell`;
const ASSET_CACHE = `${VERSION}-assets`;

const NAVIGATIONS = ['/', '/sistemas/', '/aplicaciones/', '/herramientas/', '/guias/'];
const ASSET_PREFIXES = ['/_app/', '/assets/', '/imagenes/', '/icons/', '/favicon.png', '/theme.js'];

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const shell = await caches.open(SHELL_CACHE);
    await shell.addAll(NAVIGATIONS);
    self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(
      names.filter((name) => name !== SHELL_CACHE && name !== ASSET_CACHE).map((name) => caches.delete(name))
    );
    await self.clients.claim();
  })());
});

/* Estrategia de caché según el tipo de petición. */
async function handle(request) {
  const url = new URL(request.url);
  if (request.mode === 'navigate') return networkFirst(request, url);
  if (request.destination === 'style' || request.destination === 'script' || request.mode === 'no-cors') {
    return cacheFirstAssets(request);
  }
  return fetch(request);
}

async function networkFirst(request) {
  try {
    const response = await fetch(request);
    const cache = await caches.open(SHELL_CACHE);
    await cache.put(request, response.clone());
    return response;
  } catch (error) {
    const cached = await caches.match(request);
    if (cached) return cached;
    const fallback = await caches.match('/');
    if (fallback) return fallback;
    throw error;
  }
}

async function cacheFirstAssets(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  const response = await fetch(request);
  const cache = await caches.open(ASSET_CACHE);
  await cache.put(request, response.clone());
  return response;
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  event.respondWith(handle(request));
});