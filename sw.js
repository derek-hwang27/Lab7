// sw.js - Service Worker

// You will need 3 event listeners:
//   - One for installation
//   - One for activation ( check out MDN's clients.claim() for this step )
//   - One for fetch requests

var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
  '/',
  '/scripts/',
  '/components/'
];

//install
self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

//activation
self.addEventListener('activate', event => {
    event.waitUntil(clients.claim());

    
  });

//fetch
self.addEventListener('fetch', function(event) {
    //console.log(event);

    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          // Cache hit - return response
          if (response) {
            return response;
          }
          return fetch(event.request);
        }
      )
    );
  });