APP.core = {

    config: {
    },

    init: function(oConfigOptions){
        // We extend the configuration with the custom options given
        this.config = $.extend( this.config, oConfigOptions );
        this.ajax = oConfigOptions.ajax || $.ajax;

        APP.log("----- Log ----- Loading APP.core");
        this.initPages();
    },

    pagesLookupTable: {
        "home"             : this.initHome,
        'profile'          : this.initProfile
    },

    initPages: function(){
        var page = $(this.config.pageContainerId).data('page') || "default",
            error = function(){
                HMP.notify.JSerror('No Scripts for ' + page, 'med');
            };

        if(this.pagesLookupTable[page]){
            HMP.log("----- Log ----- Loading Page: " + page);
            this.pagesLookupTable[page].call(this);
        }else{
            error();
        }
    },

    initHome: function(){},
    initProfile: function(){}

}