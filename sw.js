// src/sw.js
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.1.5/workbox-sw.js');

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);

  // Precache files
  workbox.precaching.precacheAndRoute([{"revision":"ef301ef2a5e31f1dfd4878f2fe3894f0","url":"index.html"},{"revision":"4f3bee54cfa9073ac2c0132ccc273dc9","url":"static/css/main.16c49ee4.css"},{"revision":"1eda53d6c5f2119464b255eab2af7d1c","url":"static/js/453.ed3810f9.chunk.js"},{"revision":"f94aa0770306bbb14d13d3f51b2d916f","url":"static/js/main.cffb850b.js"}]);

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
