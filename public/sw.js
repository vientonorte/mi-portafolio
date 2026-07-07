// Service Worker for PWA capabilities

const CACHE_NAME = 'rg-portfolio-v6';
const RUNTIME_CACHE = 'rg-runtime-v6';

const PRECACHE_URLS = [
  '/mi-portafolio/manifest.json',
];

function isNavigationRequest(request) {
  return request.mode === 'navigate' || request.destination === 'document';
}

function isHashedAsset(url) {
  return /\/assets\/.*\.[a-f0-9]{6,}\.(js|css)$/i.test(url.pathname);
}

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  const currentCaches = [CACHE_NAME, RUNTIME_CACHE];
  event.waitUntil(
    caches.keys()
      .then((cacheNames) =>
        Promise.all(
          cacheNames
            .filter((cacheName) => !currentCaches.includes(cacheName))
            .map((cacheName) => caches.delete(cacheName))
        )
      )
      .then(() => self.clients.claim())
  );
});

/** Network-first for HTML y bundles hasheados; cache como fallback offline. */
self.addEventListener('fetch', (event) => {
  if (!event.request.url.startsWith(self.location.origin)) return;

  const url = new URL(event.request.url);
  const networkFirst = isNavigationRequest(event.request) || isHashedAsset(url);

  if (networkFirst) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (response.status === 200) {
            const copy = response.clone();
            caches.open(RUNTIME_CACHE).then((cache) => cache.put(event.request, copy));
          }
          return response;
        })
        .catch(() => caches.match(event.request).then((cached) => cached || caches.match('/mi-portafolio/index.html')))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) return cachedResponse;

      return fetch(event.request).then((response) => {
        if (response.status === 200) {
          const copy = response.clone();
          caches.open(RUNTIME_CACHE).then((cache) => cache.put(event.request, copy));
        }
        return response;
      });
    })
  );
});