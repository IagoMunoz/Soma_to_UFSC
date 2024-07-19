importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.1.5/workbox-sw.js');

if (workbox) {
  console.log("Yay! Workbox is loaded 🎉");

  // Precache files
  workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

  // Cache JavaScript files
  workbox.routing.registerRoute(
    /\.js$/,
    new workbox.strategies.NetworkFirst()
  );

  // Cache CSS files
  workbox.routing.registerRoute(
    /\.css$/,
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'css-cache',
    })
  );

  // Cache image files
  workbox.routing.registerRoute(
    /\.(?:png|jpg|jpeg|svg|gif)$/,
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
  console.log("Boo! Workbox didn't load 😬");
}
