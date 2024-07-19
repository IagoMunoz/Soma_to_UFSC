// src/sw.js

// Import the Workbox libraries
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.1.5/workbox-sw.js');

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);

  // Precache files
  workbox.precaching.precacheAndRoute([{"revision":"d86eda33542207d308a108a20d040300","url":"index.html"},{"revision":"9d05146942ed0d9b4a17c4377ac0b696","url":"static/css/main.c3c223a5.css"},{"revision":"1eda53d6c5f2119464b255eab2af7d1c","url":"static/js/453.ed3810f9.chunk.js"},{"revision":"0fbb2802ac4812d5ff4d370b0334f5b4","url":"static/js/main.6f67ffd3.js"}]);

  // Cache strategies for various types of requests
  workbox.routing.registerRoute(
    new RegExp('\\.js$'),
    new workbox.strategies.NetworkFirst()
  );

  workbox.routing.registerRoute(
    /.*\.css$/,
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'css-cache',
    })
  );

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

  workbox.routing.registerRoute(
    ({request}) => request.destination === 'document',
    new workbox.strategies.NetworkFirst()
  );

  // Force immediate updates for all resources, ensuring users get the latest version
  self.addEventListener('install', (event) => {
    self.skipWaiting(); // Forces the waiting service worker to become the active service worker
  });

  self.addEventListener('activate', (event) => {
    event.waitUntil(clients.claim()); // Allows the service worker to start controlling open clients
    event.waitUntil(
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            return caches.delete(cacheName); // Clears old caches
          })
        );
      })
    );
  });
  
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}
