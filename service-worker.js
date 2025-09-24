const CACHE_NAME = "v1_cache_name";
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  'manifest.json',
  '/icons/wooper.png',
  '/icons/wooperbig.png'
];

// Install Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch cached assets
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});

