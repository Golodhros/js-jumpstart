/**
 * Analytics Module for jqm Mobile Page
 */
(function(jqm, $, undefined){
	"use strict";
	jqm.analytics = {
		//	Configuration Object for the application
		config: {
			sPageContainer		:'.ui-page',
			sAnalyticsGeneralId	:'UA-XXXXXX-1',
			sPageLoadEvent		:'pageshow'
		},

		//  Options loading and initial events set
		init: function(oConfigOptions){
			// We extend the configuration with the custom options given
			this.config = $.extend( jqm.analytics.config, oConfigOptions );

			jqm.log("----- Log ----- Loading jqm.analytics");
			this.addEvents();
		},

		//	Recovers all the optional data from the page element
		getAnalyticsDataFromPage: function( $page ){
			var oResult ={};

			//	Examples:
			oResult.sPageVersionName= $page.jqmData('analytics-pagever-name') || "pageVersion";
			oResult.sTypeDevice		= $page.jqmData('analytics-typedev') || "";

			return oResult;
		},

		//	Page tracking Event setting, example with custom variables
		addEvents: function(){

			$( document ).on( jqm.analytics.config.sPageLoadEvent, function() {
				var pageLoaded = null,
					oAnalytics;

				pageLoaded = "div:jqmData(role='page'):last";
				oAnalytics	= jqm.analytics.getAnalyticsDataFromPage($(pageLoaded));

				if (!oAnalytics.sPageVersion){
					_gaq.push(['_deleteCustomVar', 1]);
					_gaq.push(['_deleteCustomVar', 2]);
				} else {
					try {
						_gaq.push(['_deleteCustomVar', 1]);
						_gaq.push(['_deleteCustomVar', 2]);

						_gaq.push(['_setCustomVar',
							1,							// This custom var is set to slot #1.  Required parameter.
							oAnalytics.sPageVersionName,// The name acts as a kind of category for the user activity.  Required parameter.
							oAnalytics.sPageVersion,	// This value of the custom variable.  Required parameter.
							3							// Sets the scope to session-level.  Optional parameter.
						]);

						_gaq.push(['_setCustomVar',
							2,
							oAnalytics.sPageVersionName,
							oAnalytics.sPageVersion,
							3
						]);
					} catch(err) {
						jqm.log('----Analytics: Error, customVar not tracked!', oAnalytics.sPageVersion);
					}
				}

				if(oAnalytics.sTypeDevice){
					try {
						_gaq.push(['_setCustomVar',
							5,
							'typeDevice',
							oAnalytics.sTypeDevice,
							2
						]);
					} catch(err) {
						jqm.log('----Analytics: Error, customVar not tracked!', oAnalytics.sTypeDevice);
					}
				}

				//	General Tracking
				try {
					_gaq.push(['_setAccount', jqm.analytics.config.sAnalyticsGeneralId]);
					_gaq.push(['_setDomainName', 'domain.com']);

					if (typeof oAnalytics.sVirtualPage != 'undefined') {
						if (oAnalytics.sVirtualPage) {
							_gaq.push(['_trackPageview', oAnalytics.sVirtualPage]);
							jqm.log('----Analytics: Tracking Page View', oAnalytics.sVirtualPage);
						}
					} else {
						_gaq.push(['_trackPageview']);
						jqm.log('----Analytics: Default Tracking Page View');
					}
				} catch(err) {
					jqm.log('----Analytics: Error, page not tracked!', oAnalytics.sVirtualPage);
				}
			});
		},

		//	Action Tracking in General Account
		trackEvent: function( oEvent ){
			var sCategory	= oEvent.category,
				sAction		= oEvent.action,
				sLabel		= oEvent.label ? oEvent.label : false,
				sValue		= oEvent.value ? oEvent.value : 0;

			if(jqm.core.config.isTestEnvironment) {return;}
			try {
				if(sLabel && sValue){
					_gaq.push(['_trackEvent', sCategory, sAction, sLabel, sValue]);
				} else if(sLabel){
					_gaq.push(['_trackEvent', sCategory, sAction, sLabel]);
				} else{
					_gaq.push(['_trackEvent', sCategory, sAction ]);
				}
				jqm.log('----Analytics: Tracking Event', sAction );
			} catch(e) {
				jqm.log('----Analytics: Error, action not tracked!');
			}
		}
	};

}(window.jqm = window.jqm || {}, jQuery));

var _gaq = _gaq || [];

$(document).bind('mobileinit', function(){
	(function() {
		"use strict";
		var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
		ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') +
              '.google-analytics.com/ga.js';
		var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);

		jqm.analytics.init();
	})();
});