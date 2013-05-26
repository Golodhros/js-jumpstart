/*global APP:true, Harvey: true, console:true */
define(
    'core',
    [
        'jquery',
        'handlebars',
        'notify',
        'text'
    ],

    function ($, Handlebars, App) {
        "use strict";

        APP.core = {
            config: {
                isHiddenClass       : 'is-hidden'
            },

            init: function(oConfigOptions){
                // We extend the configuration with the custom options given
                this.config = $.extend( this.config, oConfigOptions );
                this.ajax = oConfigOptions.ajax || $.ajax;

                APP.log("----- Log ----- Loading APP.core");
                this.addEvents();
                App.notify.init({});
                App.analytics.init({});
            },

            addEvents: function(){
            }
        };

        return APP;
    }
);
