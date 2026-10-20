/*
 * Service-worker kill switch.
 *
 * nafuudelivery.com used to be an installable PWA whose worker (also at /sw.js, scope "/")
 * precached the old single-page app. Browsers re-fetch /sw.js on navigation, see this new
 * version, and install it. On activation it:
 *   1. deletes every Cache Storage entry created by the old worker,
 *   2. unregisters itself, and
 *   3. reloads open tabs once so they load the new static site from the network.
 *
 * Keep this file deployed for several months so returning visitors pick it up.
 * The restaurant dashboard PWA now lives on app.nafuudelivery.com (separate origin).
 */
self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.map((key) => caches.delete(key)));
      await self.registration.unregister();
      const clients = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
      for (const client of clients) {
        // Reload once: after unregister() the reloaded page is no longer controlled,
        // so it will not hit this worker again.
        if ("navigate" in client) client.navigate(client.url).catch(() => {});
      }
    })(),
  );
});

// Never serve anything from cache while this worker is briefly alive.
self.addEventListener("fetch", () => {});
