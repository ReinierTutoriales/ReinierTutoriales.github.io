'use strict';

const VERSION = 'rt-v2';
const SHELL_CACHE = `${VERSION}-shell`;
const ASSET_CACHE = `${VERSION}-assets`;
const OWN_CACHE = /^rt-v\d+-(?:shell|assets)$/;
const NAVIGATIONS = ['/', '/sistemas/', '/aplicaciones/', '/herramientas/', '/guias/'];
const MUTABLE_PREFIXES = ['/_app/', '/assets/', '/imagenes/', '/icons/'];
const MUTABLE_FILES = new Set(['/theme.js', '/favicon.png', '/manifest.webmanifest']);

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const shell = await caches.open(SHELL_CACHE);
    await shell.addAll(NAVIGATIONS);
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(names
      .filter((name) => OWN_CACHE.test(name) && name !== SHELL_CACHE && name !== ASSET_CACHE)
      .map((name) => caches.delete(name)));
    await self.clients.claim();
  })());
});

async function readCache(name, request) {
  try {
    return await (await caches.open(name)).match(request);
  } catch {
    return undefined;
  }
}

async function rememberResponse(name, request, response) {
  if (response.status !== 200 || response.redirected) return;
  try {
    await (await caches.open(name)).put(request, response.clone());
  } catch {
    // Cache storage can fail without invalidating a successful network response.
  }
}

async function networkFirst(request, cacheName) {
  let response;
  try {
    response = request.mode === 'navigate'
      ? await fetch(request)
      : await fetch(request, { cache: 'no-cache' });
  } catch (error) {
    const cached = await readCache(cacheName, request);
    if (cached) return cached;
    if (request.mode !== 'navigate') throw error;
    return new Response('Sin conexión. Esta página aún no está disponible sin internet.', {
      status: 503,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' }
    });
  }
  await rememberResponse(cacheName, request, response);
  return response;
}

async function cacheFirst(request) {
  const cached = await readCache(ASSET_CACHE, request);
  if (cached) return cached;
  const response = await fetch(request);
  await rememberResponse(ASSET_CACHE, request, response);
  return response;
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin || request.headers.has('range')) return;

  if (request.mode === 'navigate') {
    event.respondWith(networkFirst(request, SHELL_CACHE));
  } else if (url.pathname.startsWith('/_app/immutable/')) {
    event.respondWith(cacheFirst(request));
  } else if (MUTABLE_FILES.has(url.pathname) || MUTABLE_PREFIXES.some((prefix) => url.pathname.startsWith(prefix))) {
    event.respondWith(networkFirst(request, ASSET_CACHE));
  }
});
