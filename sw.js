// src/sw.js
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.1.5/workbox-sw.js');

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);

  // Precache files
  workbox.precaching.precacheAndRoute([{"revision":"594c3ef5632ffccf3cfeb712a5757a94","url":"index.html"},{"revision":"fbe79edfb038a18e1ba5e54fa38e6e2e","url":"static/css/main.cf48faa0.css"},{"revision":"1eda53d6c5f2119464b255eab2af7d1c","url":"static/js/453.ed3810f9.chunk.js"},{"revision":"2296439ae607f31c6cc8e14fd454b07b","url":"static/js/main.b9083e77.js"}]);

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
