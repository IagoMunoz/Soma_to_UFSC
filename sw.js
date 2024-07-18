// src/sw.js
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.1.5/workbox-sw.js');

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);

  // Precache files
  workbox.precaching.precacheAndRoute([{"revision":"5d86e0a72979369f769502cf3af08c93","url":"index.html"},{"revision":"524aa766cd63f7b0895d77f809fc0770","url":"static/css/main.692caf56.css"},{"revision":"1eda53d6c5f2119464b255eab2af7d1c","url":"static/js/453.ed3810f9.chunk.js"},{"revision":"3ecbd9668ef7f73cfede8d7b6a757b02","url":"static/js/main.f050a521.js"}]);

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
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}
