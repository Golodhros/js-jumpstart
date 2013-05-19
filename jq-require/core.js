/*global APP:true, Harvey: true, console:true */
define(
    'core',
    [
        'jquery',
        'handlebars',
        'text'
    ],

    function ($, Handlebars) {
        "use strict";
        var APP = window.APP || {};

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
            },

            addEvents: function(){
            }
        };

        return APP;
    }
);
