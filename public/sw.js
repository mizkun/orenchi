var cacheName = 'orenchi-v002';
var filesToCache = [
  '/',
	'/index.html',
  '/img/001.JPG',
  '/img/002.JPG',		
  '/img/003.JPG',
  '/img/004.JPG',		
  '/img/005.JPG',
  '/img/006.JPG',		
  '/img/007.JPG',
  '/img/008.JPG',		
  '/img/009.JPG',
  '/img/010.JPG',		
  '/img/011.JPG',		
  '/img/012.JPG',
  '/img/013.JPG',		
  '/img/014.JPG',
  '/img/015.JPG'
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching images');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        console.log('[ServiceWorker] Removing old cache', key);
        if (key !== cacheName) {
          return caches.delete(key);
        }
      }));
    })
  );
});

self.addEventListener('fetch', function(e) {
  console.log('[ServiceWorker] Fetch', e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});

