/**
 * Core Module for YP Mobile Page
 */
(function(jqm, $, undefined){
	"use strict";
	jqm.core = {
		//	Configuration Object for the application
		config: {
			sAndroidFlagClass			:'.is-android',
			sIOSFlagClass				:'.is-ios',
			sHiddenClassName			:'is-hidden',
			sActiveBtnClassName			:'ui-btn-active',
			sPageLoadEvent				:'pageshow',
			isInitialized				:false,
			isAndroid					:false,
			isIOS						:false,
			isDebug						:true
		},
		
		//  Options loading and initial events set
		init: function(oConfigOptions){
			// We extend the configuration with the custom options given
			this.config = $.extend( jqm.core.config, oConfigOptions );
			
			if(jqm.core.config.isInitialized){ return; }
			jqm.log("----- Log ----- Loading jqm.core");
			jqm.core.setEnvironmentVariables();
			jqm.core.addEvents();
			jqm.core.addErrorListeners();
			jqm.core.handleFirstPageCache();
			
			jqm.core.config.isInitialized = true;
		},
		
		//	We set the current environment flags, optional but useful
		setEnvironmentVariables: function(){
			jqm.core.checkIfInProduction();
			jqm.core.checkOS();
		},
		
		//	The Main General events that should be added
		addEvents: function(){
			$( document )
				.on( jqm.core.config.sPageLoadEvent, 'div:jqmData(role="page")', jqm.core.handlePagesShow);
		},
		
		//	Error Listeners
		addErrorListeners: function(){
			$( document ).on( "pageloadfailed", jqm.core.handlePageLoadError);
			$( window ).on( 'error', jqm.core.handleJSError);
		},
		
		checkOS: function(){
			if ( $(jqm.core.config.sAndroidFlagClass).length ){
				jqm.core.config.isAndroid = true;
			}
			if ( $(jqm.core.config.sIOSFlagClass).length ){
				jqm.core.config.isIOS = true;
			}
		},
		
		//	Automatically set the testing and debug flags off if we are in production or dev
		checkIfInProduction: function(){
			if( document.location.href.indexOf('domainname.com') > 0 ){
				jqm.core.config.isDebug = false;
			}
		},
		
		//	Main Initialization handler
		//	Needs an Id in the page element in order to intialize the proper page
		handlePagesShow: function(e){
			var sLoadedPage		= $(e.target),
				sLoadedPageId	= sLoadedPage.attr('id');
				
				jqm.log('----- Log ----- Loading Page Id:', sLoadedPageId);
				switch (sLoadedPageId){
					case 'pageName1':
						jqm.forms.init({ sCurrentForm: 'pageName1'	});
					break;
					case 'pageName2':
						jqm.forms.init({ sCurrentForm: 'pageName2'	});
					break;
					default:
						jqm.log("----- Log ----- Loading Default Page Initialization");
						jqm.log("----- Log ----- Loaded Page Identifier is ", sLoadedPageId);
				}
				
				// Common stuff to initialize on Page Show, for example:
				jqm.core.fixFixedBarsBlink();
				// Only if we have fixed bars this is useful
		},
		
		//	In debug we log something in the console, as well as the info, while in production we just track an event
		handleJSError: function( e ){
			if(jqm.core.config.isDebug){
				jqm.log('----- Error ----- Grabbed an error!');
				jqm.log( e );
			}else{
				jqm.analytics.trackEvent({category: 'Error' , action: 'Javascript'});
			}
		},
		
		//	In debug we log something in the console, as well as the info, while in production we just track an event
		handlePageLoadError: function( e ){
			if(jqm.core.config.isDebug){
				jqm.log('----- Error ----- Grabbed a Page Load error!');
				jqm.log( e );
			}else{
				jqm.analytics.trackEvent({category: 'Error' , action: 'Page Load'});
			}
		},
		
		//	INFO: We don't want jqm to keep the first page indefinitely, we need to break the cache, even if we are doing ajax
		handleFirstPageCache: function(toPage, info) {
			if($.mobile.firstPage && info.options.fromPage && info.toPage && ($.mobile.firstPage == info.options.fromPage) && !$.mobile.firstPage.is('[data-dom-cache="true"]') && (info.toPage.attr('data-url') != info.options.fromPage.attr('data-url'))) {
				$.mobile.firstPage.remove();
				
				// We only need to remove 1 time from DOM, so unbind the unused event
				$(document).off("pagechange", this);
			}
		},
		
		//	Utility method to extract a given parameter from the url
		getUrlParam: function (sName) {
			var results = new RegExp('[\\?&]' + sName + '=([^&#]*)').exec(window.location.href);

			if(!results){
				return 0;
			}else{
				return results[1];
			} 
		},
		
		//	Code for make the fixed areas (header, menu and skills drawer) really fixed, 
		//	so that does not get hide when scrolling or tap in an empty area of the UI
		fixFixedBarsBlink: function(){
			$("div:jqmData(role=header)").add('.menu').fixedtoolbar({ tapToggle: false });
		}
	};
	
	jqm.log = function(sMsg){
		if(jqm.core.config.isDebug){
			if(arguments.length === 2){
				console.log( arguments[0], arguments[1]);
			}else{
				console.log(sMsg);
			}
		}
	};

}(window.jqm = window.jqm || {}, jQuery));