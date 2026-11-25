import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { runInNewContext } from 'node:vm';

const source = await readFile(new URL('../static/sw.js', import.meta.url), 'utf8');
const origin = 'https://reiniertutoriales.github.io';

function setupWorker(fetch) {
  const listeners = new Map();
  const stores = new Map();
  const key = (request) => new URL(typeof request === 'string' ? request : request.url, origin).href;
  const caches = {
    async open(name) {
      if (!stores.has(name)) stores.set(name, new Map());
      const store = stores.get(name);
      return {
        async match(request) { return store.get(key(request))?.clone(); },
        async put(request, response) { store.set(key(request), response.clone()); }
      };
    },
    async match(request) {
      for (const store of stores.values()) {
        const response = store.get(key(request));
        if (response) return response.clone();
      }
    },
    async keys() { return [...stores.keys()]; },
    async delete(name) { return stores.delete(name); }
  };
  runInNewContext(source, {
    Response, URL, caches, fetch,
    self: {
      location: { origin },
      clients: { claim() {} },
      addEventListener(name, listener) { listeners.set(name, listener); }
    }
  });

  const dispatch = (name, event) => new Promise((resolve, reject) => {
    const complete = (value) => Promise.resolve(value).then(resolve, reject);
    listeners.get(name)({ ...event, respondWith: complete, waitUntil: complete });
  });
  return {
    caches,
    request(path, mode = 'same-origin', destination = 'script') {
      return dispatch('fetch', { request: { url: origin + path, method: 'GET', mode, destination, headers: new Headers() } });
    },
    activate() { return dispatch('activate', {}); }
  };
}

test('theme.js se revalida en línea y conserva la última copia válida sin conexión', async () => {
  let body = 'theme v1';
  let offline = false;
  const worker = setupWorker(async () => {
    if (offline) throw new TypeError('offline');
    return new Response(body);
  });
  assert.equal(await (await worker.request('/theme.js')).text(), 'theme v1');
  body = 'theme v2';
  assert.equal(await (await worker.request('/theme.js')).text(), 'theme v2');
  offline = true;
  assert.equal(await (await worker.request('/theme.js')).text(), 'theme v2');
});

test('un error temporal de navegación no reemplaza la copia válida', async () => {
  let status = 200;
  const worker = setupWorker(async () => {
    if (status === 0) throw new TypeError('offline');
    return new Response(String(status), { status });
  });
  assert.equal((await worker.request('/guias/', 'navigate')).status, 200);
  status = 503;
  assert.equal((await worker.request('/guias/', 'navigate')).status, 503);
  status = 0;
  assert.equal((await worker.request('/guias/', 'navigate')).status, 200);
});

test('un fallo HTTP en un activo inmutable permite recuperarlo en el siguiente intento', async () => {
  let status = 503;
  let requests = 0;
  const worker = setupWorker(async () => {
    requests += 1;
    return new Response(String(status), { status });
  });
  const path = '/_app/immutable/entry/start.Abc123.js';
  assert.equal((await worker.request(path)).status, 503);
  status = 200;
  assert.equal((await worker.request(path)).status, 200);
  assert.equal((await worker.request(path)).status, 200);
  assert.equal(requests, 2);
});

test('activar el worker conserva las cachés de otros proyectos del mismo origen', async () => {
  const worker = setupWorker(async () => new Response('unused'));
  await worker.caches.open('other-project-cache');
  await worker.caches.open('rt-v1-assets');
  await worker.activate();
  assert.deepEqual(await worker.caches.keys(), ['other-project-cache']);
});

test('una ruta desconocida sin conexión no se confunde con la portada', async () => {
  let offline = false;
  const worker = setupWorker(async () => {
    if (offline) throw new TypeError('offline');
    return new Response('Home');
  });
  assert.equal((await worker.request('/', 'navigate')).status, 200);
  offline = true;
  assert.equal((await worker.request('/guias/no-cache/', 'navigate')).status, 503);
});
