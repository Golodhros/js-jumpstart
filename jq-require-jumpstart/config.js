require.config({
    deps : ["application"],
    //baseUrl: '',
    //urlArgs: 'bust=v1',
    paths : {
        application           : "app",
        jquery                : "vendor/jquery-1.9.1.min",
        jqueryvalidation      : "vendor/jquery.validate.min",
        handlebars            : "vendor/handlebars",
        text                  : "vendor/text",
        mustache              : "vendor/mustache",
        ga                    : "http://www.google-analytics.com/ga",
        core                  : "src/core",
        notify                : "src/notify",
        analytics             : "src/analytics"
    },

    shim : {
        handlebars : {
            exports : "Handlebars"
        },
        jqueryvalidation : {
            deps : ["jquery"],
            exports: '$'
        }
    }
});
