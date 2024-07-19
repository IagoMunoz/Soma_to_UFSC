// src/sw.js
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.1.5/workbox-sw.js');

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);

  // Precache files
  workbox.precaching.precacheAndRoute([{"revision":"5858778213463a7beb2c5c8818cd1cf4","url":"index.html"},{"revision":"0e1c5c4bf4b7eaaa90e2a80ba7f85994","url":"static/css/main.d3229d4f.css"},{"revision":"d0f139f203b4f12097a24e54698b936e","url":"static/js/453.620ef83d.chunk.js"},{"revision":"a9d84ddf55ec5f90a50d91e51207682c","url":"static/js/main.85891bdb.js"}]);

  // Cache JavaScript files
  workbox.routing.registerRoute(
    new RegExp('\\.js$'),
    new workbox.strategies.NetworkFirst()
  );

  // Cache CSS files
  workbox.routing.registerRoute(
    /.*\.css$/,
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'css-cache',
    })
  );

  // Cache image files
  workbox.routing.registerRoute(
    /.*\.(?:png|jpg|jpeg|svg|gif)$/,
    new workbox.strategies.CacheFirst({
      cacheName: 'image-cache',
      plugins: [
        new workbox.expiration.Plugin({
          maxAgeSeconds: 7 * 24 * 60 * 60, // Cache for one week
          maxEntries: 20, // Only cache 20 images
        })
      ],
    })
  );

  // Event listeners for Service Worker lifecycle
  self.addEventListener('install', event => {
    console.log('Service Worker instalado');
    self.skipWaiting();
  });

  self.addEventListener('activate', event => {
    console.log('Service Worker ativado');
    event.waitUntil(
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cache => {
            if (cache !== 'your-cache-name') {
              console.log('Service Worker limpando caches antigos');
              return caches.delete(cache);
            }
          })
        );
      })
    );
  });

  self.addEventListener('fetch', event => {
    event.respondWith(
      caches.match(event.request)
        .then(response => {
          return response || fetch(event.request);
        })
    );
  });

} else {
  console.log(`Boo! Workbox didn't load 😬`);
}
