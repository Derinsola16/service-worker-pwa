let cacheName = "petstore-v1";
let cacheFiles = [
  'index.html',
  'product.js',
  'style.css',
  'petstore.webmanifest',
  'images/yarn.jpg',
  'images/cat-litter.jpg',
  'images/laser-pointer.jpg',
  'images/cat-house.jpg',
  'images/icon-store-512.jpg',
];

self.addEventListener('install', (e) => {
  console.log('[Service Worker] Install');
  e.waitUntill(
    caches.open(cacheName).then((cache) => {
      console.log('[Service Worker] Caching all the files');
      return cache.addAll(cacheFiles)
    })
  );
})

self.addEventListener('fecth', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(r) {
      return r || fetch(e.request).then(function(response) {
        return caches.open(cacheName).then(function(cache) {
          cache.put(e.request, response.clone());
          return response;
        });
      })
    })
  )
})