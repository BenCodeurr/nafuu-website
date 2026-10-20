/*
 * Replaces the vite-plugin-pwa registerSW.js of the old SPA (cached HTML may still request it).
 * Instead of registering a worker, it removes any existing one and clears its caches,
 * then reloads once if the page was being controlled by the old worker.
 */
(function () {
  if (!("serviceWorker" in navigator)) return;
  var RELOAD_FLAG = "nafuu-sw-killed";

  navigator.serviceWorker.getRegistrations().then(function (registrations) {
    if (registrations.length === 0) return;

    var wasControlled = !!navigator.serviceWorker.controller;
    var cleanup = registrations.map(function (registration) {
      return registration.unregister();
    });
    if ("caches" in window) {
      cleanup.push(
        caches.keys().then(function (keys) {
          return Promise.all(keys.map(function (key) { return caches.delete(key); }));
        }),
      );
    }

    Promise.all(cleanup).then(function () {
      var alreadyReloaded = false;
      try {
        alreadyReloaded = sessionStorage.getItem(RELOAD_FLAG) === "1";
        sessionStorage.setItem(RELOAD_FLAG, "1");
      } catch (e) {
        alreadyReloaded = true; // storage blocked: never risk a reload loop
      }
      if (wasControlled && !alreadyReloaded) window.location.reload();
    });
  });
})();
