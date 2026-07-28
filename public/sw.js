// Service Worker — Viento Norte (canon domain root)
// Hashed assets: network-only. Never mix deploy generations.

const CACHE_NAME = "vn-site-v1";
const RUNTIME_CACHE = "vn-runtime-v1";

const PRECACHE_URLS = ["/manifest.json"];

function isNavigationRequest(request) {
  return request.mode === "navigate" || request.destination === "document";
}

function isHashedAsset(url) {
  return /\/assets\/.+\.[a-fA-Z0-9_-]{6,}\.(js|css|woff2?)$/i.test(url.pathname);
}

function isPortfolioImage(url) {
  return /\/images\//i.test(url.pathname);
}

function isHtmlShell(url) {
  return (
    url.pathname === "/" ||
    url.pathname === "/index.html" ||
    url.pathname === "/404.html"
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

self.addEventListener("fetch", (event) => {
  if (!event.request.url.startsWith(self.location.origin)) return;
  if (event.request.method !== "GET") return;

  const url = new URL(event.request.url);

  if (isHashedAsset(url)) {
    event.respondWith(fetch(event.request, { cache: "no-store" }));
    return;
  }

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
          caches
            .match(event.request)
            .then((cached) => cached || caches.match("/index.html"))
        )
    );
    return;
  }

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
