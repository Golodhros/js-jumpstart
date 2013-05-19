require.config({
    deps : ["application"],
    //baseUrl: '',
    //urlArgs: 'bust=v1',
    paths : {
        application           : "app",
        jquery                : "vendor/jquery-1.8.2.min",
        jqueryvalidation      : "vendor/jquery.validate.min",
        handlebars            : "vendor/handlebars",
        text                  : "vendor/text",
        core                  : "src/core"
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
