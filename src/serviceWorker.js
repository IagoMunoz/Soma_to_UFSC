// src/serviceWorker.js
const CACHE_NAME = 'your-app-cache-v1';

this.addEventListener('install', event => {
  this.skipWaiting();
});

this.addEventListener('activate', event => {
  event.waitUntil(this.clients.claim());
});

this.addEventListener('message', event => {
  if (event.data && event.data.type === 'UPDATE_AVAILABLE') {
    this.skipWaiting();
  }
});

this.addEventListener('fetch', event => {
  event.respondWith(
    caches.open(CACHE_NAME).then(cache => {
      return cache.match(event.request).then(response => {
        return response || fetch(event.request).then(networkResponse => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
      });
    })
  );
});
