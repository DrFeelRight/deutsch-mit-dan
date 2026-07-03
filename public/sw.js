/* Deutsch Trainer service worker — hand-rolled, no dependencies.
 *
 * Strategy:
 *  - navigations:            network-first, offline fallback to cached shell
 *  - /assets/* (hashed):     cache-first (immutable — filenames change per build)
 *  - Google Fonts:           stale-while-revalidate
 *  - /api/*:                 network-only (AI responses are cached app-side, not here)
 *  - other same-origin GET:  stale-while-revalidate
 *
 * Bump VERSION to invalidate all runtime caches after a breaking change.
 */
const VERSION = 'dt-v1';
const CORE = ['/', '/manifest.webmanifest', '/favicon.svg'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(VERSION)
      .then((cache) => cache.addAll(CORE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

const putInCache = async (request, response) => {
  if (response && response.ok) {
    const cache = await caches.open(VERSION);
    cache.put(request, response.clone());
  }
  return response;
};

const networkFirst = async (request, fallbackUrl) => {
  try {
    return await putInCache(request, await fetch(request));
  } catch {
    const cached = await caches.match(request);
    return cached || caches.match(fallbackUrl);
  }
};

const cacheFirst = async (request) => {
  const cached = await caches.match(request);
  return cached || putInCache(request, await fetch(request));
};

const staleWhileRevalidate = async (request) => {
  const cached = await caches.match(request);
  const refresh = fetch(request)
    .then((res) => putInCache(request, res))
    .catch(() => undefined);
  return cached || refresh;
};

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // Live AI endpoints must never be served stale by the SW.
  if (url.pathname.startsWith('/api/')) return;

  if (request.mode === 'navigate') {
    event.respondWith(networkFirst(request, '/'));
    return;
  }

  if (url.origin === self.location.origin && url.pathname.startsWith('/assets/')) {
    event.respondWith(cacheFirst(request));
    return;
  }

  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    event.respondWith(staleWhileRevalidate(request));
    return;
  }

  if (url.origin === self.location.origin) {
    event.respondWith(staleWhileRevalidate(request));
  }
});
