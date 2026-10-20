/*
 * Intentionally empty. The old PWA's HTML loaded /registerSW.js to register its Workbox
 * worker; serving a no-op here stops that from happening. The worker itself is retired
 * by the kill switch in /sw.js. Keep this file deployed while /sw.js is.
 */
