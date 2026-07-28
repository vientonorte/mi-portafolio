// Service Worker — Viento Norte portfolio
// ROOT: never mix deploy generations. Hashed assets are network-only (no stale fallback).

const CACHE_NAME = "rg-portfolio-v16";
const RUNTIME_CACHE = "rg-runtime-v16";

const PRECACHE_URLS = ["/mi-portafolio/manifest.json"];

function isNavigationRequest(request) {
  return request.mode === "navigate" || request.destination === "document";
}

/** Vite/rolldown content-hashed bundles — never serve from a previous deploy. */
function isHashedAsset(url) {
  return /\/assets\/.+\.[a-fA-Z0-9_-]{6,}\.(js|css|woff2?)$/i.test(url.pathname);
}

function isPortfolioImage(url) {
  return /\/images\//i.test(url.pathname);
}

function isHtmlShell(url) {
  return (
    url.pathname === "/mi-portafolio/" ||
    url.pathname === "/mi-portafolio/index.html" ||
    url.pathname === "/mi-portafolio/404.html" ||
    url.pathname.endsWith("/mi-portafolio")
  );
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("message", (event) => {
  if (event.data?.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.addEventListener("activate", (event) => {
  const keep = new Set([CACHE_NAME, RUNTIME_CACHE]);
  event.waitUntil(
    caches
      .keys()
      .then((names) =>
        Promise.all(names.filter((n) => !keep.has(n)).map((n) => caches.delete(n)))
      )
      .then(() => self.clients.claim())
  );
});

/**
 * Strategy (root fix for multi-fail after deploy):
 * - Hashed /assets/* → network only (no cache fallback → no cross-deploy chunk mix)
 * - HTML shell → network-first, no-store; cache only 200
 * - Images → network-first with cache fallback (ok to soft-fail)
 * - Rest → cache-first
 */
self.addEventListener("fetch", (event) => {
  if (!event.request.url.startsWith(self.location.origin)) return;
  if (event.request.method !== "GET") return;

  const url = new URL(event.request.url);

  // 1) Hashed bundles: never serve stale JS/CSS from another deploy
  if (isHashedAsset(url)) {
    event.respondWith(
      fetch(event.request, { cache: "no-store" }).then((response) => {
        // Do not put non-OK responses in cache (503 was poisoning offline path)
        return response;
      })
    );
    return;
  }

  // 2) HTML / navigations: always prefer network
  if (isNavigationRequest(event.request) || isHtmlShell(url)) {
    event.respondWith(
      fetch(event.request, { cache: "no-store" })
        .then((response) => {
          if (response.ok) {
            const copy = response.clone();
            caches.open(RUNTIME_CACHE).then((cache) => cache.put(event.request, copy));
          }
          return response;
        })
        .catch(() =>
          caches.match(event.request).then(
            (cached) => cached || caches.match("/mi-portafolio/index.html")
          )
        )
    );
    return;
  }

  // 3) Images: network-first, cache OK as soft offline
  if (isPortfolioImage(url)) {
    event.respondWith(
      fetch(event.request, { cache: "no-store" })
        .then((response) => {
          if (response.ok) {
            const copy = response.clone();
            caches.open(RUNTIME_CACHE).then((cache) => cache.put(event.request, copy));
          }
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // 4) Other: cache-first
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) return cachedResponse;
      return fetch(event.request).then((response) => {
        if (response.ok) {
          const copy = response.clone();
          caches.open(RUNTIME_CACHE).then((cache) => cache.put(event.request, copy));
        }
        return response;
      });
    })
  );
});
