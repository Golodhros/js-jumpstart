// Installing a new service worker

// Fallback lace
if ('serviceWorker' in navigator) {

    // Registering
    navigator.serviceWorker
        .register('./path_to_your_worker.js', {
            scope: './base_url_of_the_web_app/'
        }).then(function(registration) {
            // Do soemthing with registration...
        }, function(error) {
            console.log('Failed to install:' + error);
        });

    // Unregistering (uninstall) all
    navigator.serviceWorker
        .getRegistrations()
        .then(function(registrations) {
            for (let registration of registrations) {
                registration.unregister();
            }
        });
}
