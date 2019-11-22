const CACHE_KEY = `supermaya-${process.env.BUILD_ID}`;

// URLS that we don’t want to end up in the cache
const EXCLUDED_URLS = [];

// URLS that we want to be cached when the worker is installed
const PRE_CACHE = ["/", "/posts"];

// You might want to bypass a certain host
const IGNORED_HOSTS = ["localhost"];

const addToCache = function(items) {
  caches.open(CACHE_KEY).then(cache => cache.addAll(items));
};

self.addEventListener("install", () => {
  self.skipWaiting();
  addToCache(CACHE_KEY, PRE_CACHE);
});

self.addEventListener("activate", evt => {
  // Look for any old caches that don't match our set and clear them out
  evt.waitUntil(
    caches
      .keys()
      .then(cacheNames => {
        return cacheNames.filter(
          item => !Object.values(CACHE_KEY).includes(item)
        );
      })
      .then(itemsToDelete => {
        return Promise.all(
          itemsToDelete.map(item => {
            return caches.delete(item);
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  // Ignore hosts
  const { hostname } = new URL(event.request.url);
  if (IGNORED_HOSTS.indexOf(hostname) >= 0) {
    return;
  }

  // Ignore URLs
  if (EXCLUDED_URLS.some(page => event.request.url.indexOf(page) > -1)) {
    return;
  }

  // Respond with cache first but complete network request and update cache if possible
  return caches.open(CACHE_KEY).then(cache => {
    return cache.match(event.request).then(response => {
      var fetchPromise = fetch(event.request).then(networkResponse => {
        cache.put(event.request, networkResponse.clone());
        return networkResponse;
      });
      return response || fetchPromise;
    });
  });
});
