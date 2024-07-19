// src/sw.js
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.1.5/workbox-sw.js');

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);

  // Precache files
  workbox.precaching.precacheAndRoute([{"revision":"f140076a0c3b035fcd6e994f49404190","url":"index.html"},{"revision":"c81830b16eb1be5050b88c643ce7d3db","url":"static/css/main.22192e01.css"},{"revision":"1eda53d6c5f2119464b255eab2af7d1c","url":"static/js/453.ed3810f9.chunk.js"},{"revision":"1a78ca5c496a873033890764b43d0697","url":"static/js/main.212dc04f.js"}]);

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
