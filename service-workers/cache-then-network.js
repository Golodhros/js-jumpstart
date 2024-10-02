app.getData = function(key, label) {
    var url = APIUrlBase + key + '.json',
        request,
        response;

    // Make sure caches is available
    if ('caches' in window) {
        caches.match(url).then(function(response) {
            if (response) {
                response.json().then(function(json) {
                    json.key = key;
                    json.label = label;
                    app.updateForecastCard(json);
                });
            }
        });
    }

    // Make the XHR to get the data, then update the card
    request = new XMLHttpRequest();

    request.onreadystatechange = function() {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                response = JSON.parse(request.response);

                response.key = key;
                response.label = label;
                app.updateForecastCard(response);
            }
        }
    };
    request.open('GET', url);
    request.send();
};


// ON SW
self.addEventListener('fetch', function(e) {
    if (e.request.url.startsWith(APIUrlBase)) {
        e.respondWith(
            fetch(e.request)
            .then(function(response) {
                return caches.open(dataCacheName).then(function(cache) {
                    cache.put(e.request.url, response.clone());
                    console.log('[ServiceWorker] Fetched & Cached', e.request.url);
                    return response;
                });
            })
            );
    } else {
        e.respondWith(
            caches.match(e.request).then(function(response) {
                console.log('[ServiceWorker] Fetch Only', e.request.url);
                return response || fetch(e.request);
            })
        );
    }
});