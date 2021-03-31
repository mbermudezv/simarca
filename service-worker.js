const CACHE_NAME = 'static-cache';
const FILES_TO_CACHE = ['./', './offline.html', './img/sinconexion.png'];
  
self.addEventListener('install', function(evt) {
    console.log('Intentando instalar la aplicación!');
    evt.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
          console.log('[ServiceWorker] Pre-caching la página offline: offline.html');
          return cache.addAll(FILES_TO_CACHE);
        })
    );
  });
  
  self.addEventListener("activate", event => {
    console.log('Activado!');
    event.waitUntil(
        caches.keys().then((keyList) => {
          return Promise.all(keyList.map((key) => {
            if (key !== CACHE_NAME) {
              console.log('[ServiceWorker] Removing old cache', key);
              return caches.delete(key);
            }
          }));
        })
    );
  });

  self.addEventListener('fetch', function(event) {
    console.log('Fetch!', event.request);
    if (event.request.mode !== 'navigate') {
        // Not a page navigation, bail.
        return;
      }
      event.respondWith(
          fetch(event.request)
              .catch(() => {
                return caches.open(CACHE_NAME)
                    .then((cache) => {
                      return cache.match('./offline.html');
                    });
              })
      );
  });