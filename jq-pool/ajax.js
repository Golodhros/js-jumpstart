APP.core = {

    config: {
        overlayClass: '.overlay',
        loaderClass: '.loader'
    },

    init: function(oConfigOptions){
        // We extend the configuration with the custom options given
        this.config = $.extend( this.config, oConfigOptions );
        this.setUpAjax();

        APP.log("----- Log ----- Loading APP.core");
    },

    ajaxConf: {
        beforeSend: function(){
            APP.core.showLoading();
        },
        complete: function(){
            APP.core.hideLoading();
        },
        error: function(x, status, error){
            APP.notify.IOerror('An AJAX error ocurred: ' + status + '\nError: ' + error +'\nPlease, try again later!', 'high');
        },
        cache: false,
        timeout: 5000 //Example
    },

    setUpAjax: function(){
        this.ajax = $.ajax;
        $.ajaxSetup(this.ajaxConf);
    },

    showLoading: function( msg ){
        $(this.core.config.overlayClass).show();
        $(this.config.loaderClass).show();
    },

    hideLoading: function(){
        $(this.config.loaderClass).hide();
        $(this.config.overlayClass).hide();
    },

};
