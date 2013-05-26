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
        tween                 : "vendor/tweenjs-0.4.0.min",
        easel                 : "vendor/easeljs-0.6.0.min",
        sound                 : "vendor/soundjs-0.4.0.min",
        preload               : "vendor/preloadjs-0.3.0.min",
        core                  : "src/core"
    },

    shim : {
        handlebars : {
            exports : "Handlebars"
        },
        jqueryvalidation : {
            deps : ["jquery"],
            exports: '$'
        },
        easel: {
            exports: 'createjs'
        },
        tween: {
            deps: ['easel'],
            exports: 'Tween'
        }
    }
});
