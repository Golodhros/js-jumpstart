define(
    'analytics',
    [
        'jquery',
        'ga'
    ],
    function ($) {
        "use strict";
        var App = window.App || {};

        App.analytics = {
            //  Configuration Object for the application
            config: {
                sAnalyticsGeneralId :'UA-XXXXX',
                sDomain: 'url.com'
            },

            //  Options loading and initial events set
            init: function(oConfigOptions){
                this.config = $.extend( App.analytics.config, oConfigOptions );
                App.log("----- Log ----- Loading App.analytics");
                this.setUpTracking();
                this.setUpAddThis();
                this.trackPageView();
            },

            setUpTracking: function(){
                window._gaq = window._gaq || [];
                window._gaq.push(['_setAccount', this.config.sAnalyticsGeneralId]);
            },

            //TODO: Review this
            setUpAddThis: function(){
                // Config
                window.addthis_config = {
                    "data_track_addressbar" : true,
                    "data_ga_property"      : App.analytics.config.sAnalyticsGeneralId
                };
            },

            //  Page tracking Event setting
            trackPageView: function(){
                try {
                    window._gaq.push(['_setDomainName', App.analytics.config.sDomain]);
                    window._gaq.push(['_trackPageview']);
                    App.log('----Analytics: Default Tracking Page View');
                } catch(err) {
                    App.log('----Analytics: Error, page not tracked!');
                }
            },

            //  Action Tracking in General Account
            trackEvent: function( oEvent ){
                var sCategory   = oEvent.category,
                    sAction     = oEvent.action,
                    sLabel      = oEvent.label || false,
                    sValue      = oEvent.value || 0;

                try {
                    if(sLabel && sValue){
                        window._gaq.push(['_trackEvent', sCategory, sAction, sLabel, sValue]);
                    } else if(sLabel){
                        window._gaq.push(['_trackEvent', sCategory, sAction, sLabel]);
                    } else{
                        window._gaq.push(['_trackEvent', sCategory, sAction ]);
                    }
                    App.log('----Analytics: Tracking Event', sAction );
                } catch(e) {
                    App.log('----Analytics: Error, action not tracked!');
                }
            }
        };

        return App;
    }
);
