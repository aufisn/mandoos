// Mandoos Service Worker — enables "Add to Home Screen" installability and basic offline
// support. Bump CACHE_NAME on every deploy that changes any precached file, so old caches get
// cleaned up and clients pick up the new version promptly (skipWaiting + clients.claim below).
const CACHE_NAME = 'mandoos-v1';
const PRECACHE_URLS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './icon-maskable-512.png',
  './apple-touch-icon.png',
  './favicon-32.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((names) => Promise.all(names.filter((n) => n !== CACHE_NAME).map((n) => caches.delete(n))))
      .then(() => self.clients.claim())
  );
});

// Navigation (the app shell itself): network-first, falling back to the cached copy when
// offline — so an online visit always gets the latest deployed version, and an offline one still
// opens instead of showing the browser's own "no internet" page. Everything else (icons,
// manifest): cache-first, falling back to network — these rarely change and cache-first avoids
// an unnecessary round-trip for them.
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  const isNavigation = event.request.mode === 'navigate';
  if (isNavigation) {
    event.respondWith(
      fetch(event.request)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put('./index.html', copy));
          return res;
        })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
