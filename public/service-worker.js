const CACHE_NAME = 'sage-offline-v1';
const APP_SHELL = ['/', '/my-trips', '/trip-builder', '/manifest.webmanifest', '/icon-192.png', '/icon-512.png'];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin === self.location.origin && url.pathname.startsWith('/api/')) return;

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(async () => {
          const cached = await caches.match(request);
          if (cached) return cached;
          // A shared snapshot must never fall through to the analytics-enabled app shell.
          if (/^\/shared-trip(?:\.html)?\/?$/.test(url.pathname)) {
            return new Response('<!doctype html><html lang="en"><meta name="robots" content="noindex,nofollow"><title>Reconnect to open your plan</title><h1>Reconnect to open this shared plan</h1><p>Ask the sender for a text copy if you cannot get online.</p><a href="/my-trips">Open a copy already saved on this device</a></html>', { status: 503, headers: { 'Content-Type': 'text/html; charset=utf-8' } });
          }
          return caches.match('/');
        })
    );
    return;
  }

  const cacheable =
    url.origin === self.location.origin ||
    (url.hostname === 'res.cloudinary.com' && request.destination === 'image');
  if (!cacheable) return;

  event.respondWith(
    caches.match(request).then((cached) => {
      const network = fetch(request)
        .then((response) => {
          if (response.ok || response.type === 'opaque') {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          }
          return response;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
});

