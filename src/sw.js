// src/sw.js

// Import the Workbox libraries
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.1.5/workbox-sw.js');

// Apply caching strategies
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