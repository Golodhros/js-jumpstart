/*
 * Ajax Configuration Module
 * Original Project: HMP
 *
 */

APP.ajax = {

    config: {
        overlayClass: '.overlay',
        loaderClass: '.loader'
    },

    init: function(oConfigOptions){
        // We extend the configuration with the custom options given
        this.config = $.extend( this.config, oConfigOptions );
        this.setUpAjax();

        APP.log("----- Log ----- Loading APP.ajax");
    },

    ajaxConf: {
        beforeSend: function(){
            APP.ajax.showLoading();
        },
        complete: function(){
            APP.ajax.hideLoading();
        },
        error: function(x, status, error){
            // Log Errors
        },
        cache: false,
        timeout: 5000 //Example
    },

    setUpAjax: function(){
        this.ajax = $.ajax;
        $.ajaxSetup(this.ajaxConf);
    },

    showLoading: function( msg ){
        $(this.config.overlayClass).show();
        $(this.config.loaderClass).show();
    },

    hideLoading: function(){
        $(this.config.loaderClass).hide();
        $(this.config.overlayClass).hide();
    },
};