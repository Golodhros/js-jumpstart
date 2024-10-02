var version = 'random-app-v1';
var filesToCache = [
    '/',
    '/index.html',
    '/scripts/app.js',
    '/scripts/localforage-1.4.0.js',
    '/styles/ud811.css',
    '/images/clear.png',
    '/images/wind.png'
];

// Install
self.addEventListener('install', function(e) {
    console.log('[ServiceWorker] Installed version', version);
    e.waitUntil(
        caches.open(cacheName).then(function(cache) {
            console.log('[ServiceWorker] Caching app shell');
            return cache.addAll(filesToCache);
        })
        );
});

// Activate
self.addEventListener('activate', function(e) {
    console.log('[ServiceWorker] Activate');
    e.waitUntil(
        caches.keys().then(function(keyList) {
            return Promise.all(keyList.map(function(key) {
                if (key !== cacheName) {
                    console.log('[ServiceWorker] Removing old cache', key);
                    return caches.delete(key);
                }
            }));
        })
        );
});



fetch('./random-cached.jpg').then(function(response) {
    return caches.open(version).then(function(cache) {
        console.log('[ServiceWorker] Cached random.jpg for', version);
        return cache.put('random.jpg', response);
    });
}).then(function() {
    console.log('[ServiceWorker] Skip waiting on install');
    return self.skipWaiting();
})
