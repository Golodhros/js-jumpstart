/** 
 * jQuery based Ajax Calls extension
 * Based in Nicholas Zakas presentation "Scalable JavaScript Application Architecture"
 * http://www.slideshare.net/nzakas/scalable-javascript-application-architecture
 * */

//TODO: Make it for native javascript

var core = core === undefined ? {} : core; 

core.io = {
	config : {
		dataType: 'json',
		contentType: 'application/json'
	},
    
    /**
     * Generic Ajax Call
     * @param oCallId 		- object that contains: name of call, type of call and parameters 
     * @param oCallParams 	- object that contains callbacks for: success, error and before
     * @param $gadget 		- gadget jquery object identifier
     */
    call: function ( oCallId, oCallParams, $gadget ){
    	var sCallId = oCallId.name,
    	sCallType = oCallId.type,
    	oUrlParams = oCallId.params,
		oCache = ( oCallId.cache != undefined && oCallId.cache !== null ) ? ( (!oCallId.cache) ? false : true ) : true,
    	oAsync = ( oCallId.async != undefined && oCallId.async != null ) ? ( (!oCallId.async) ? false : true ) : true,
    	oInputData = oCallParams.data,
    	oBefore = oCallParams.before,
    	oSuccess = oCallParams.success,
    	oFailure = oCallParams.failure,
    	oComplete = oCallParams.complete,
    	oOutputData = {},
    	// Default Callbacks
    	oDefaultBefore = function() {
    		$gadget.find('.loading-layer').show();
    	},
    	oDefaultComplete = function() {
    		$gadget.find('.loading-layer').hide();
    	},
    	oDefaultFailure = function(jqXHR, textStatus, errorThrown) {
    		var sErrorMsg = errorThrown || jqXHR.statusText,
    		nStatusMsg = jqXHR.status;
    		core.errors.iOError( nStatusMsg, sErrorMsg, $gadget );
    	},
    	// Default Ajax Call Configuration
    	oCallData = {
    		type: sCallType,
    		dataType: this.config.dataType,
    		contentType: this.config.contentType,
			async: oAsync,
    		cache: oCache,
    		url: this.getUrlForAjaxCall ( sCallId, oUrlParams )
			//or url: this.getUrlLookUp( sCallId, oUrlParams )
    	};
			
    	// check if callbacks are callable
    	if (typeof oSuccess === "function") {
    		oCallData.success =  oSuccess;
    	}
    	if (typeof oBefore === "function") {
    		oCallData.beforeSend = oBefore;
    	}
    	if (typeof oFailure === "function") {
    		oCallData.error = oFailure;
    	}else{
    		oCallData.error = oDefaultFailure;
    	}
    	if (typeof oBefore === "function") {
    		oCallData.beforeSend = oBefore;
    	}else{
    		oCallData.beforeSend = oDefaultBefore;
    	}
    	if (typeof oComplete === "function") {
    		oCallData.complete = oComplete;
    	}else{
    		oCallData.complete = oDefaultComplete;
    	}
    	//If info is send with the call
    	if (oInputData) {
    		oCallData.data = oInputData;
    	}
    	
    	$.ajaxSetup(oCallData);
    	$.ajax();
    	
    	// Ajax Call Example:
    	//  core.io.call ({
		//    		name: 'customizeAcc', 
		//    		type: 'put', 
		//    		params: {param1: sId}
		//     	},{
		//     		success: function ( response ){
		//     			moduleName.handleSuccess ( response, $gadget );
		//     		},
		//     		failure: function ( response ){
		//     			moduleName.handleFailure ( response, $gadget ); 
		//     		},
		//     		data: jsonData
		//     	}, $gadget );
    },
    
    /**
	 * Returns the URLs of the Ajax Calls, 
	 * provided an identifier and parameters
	 * @param args - an identifier (the first argument), and a set of parameters
	 * TODO: not performance-optimized
	 */
	getUrlForAjaxCall: function ( sId, oUrlParams ){
		switch ( sId ){
			//Common
			case 'myAccounts':
			case 'customizeAccList':
				return '/retail/accounts';

			case 'accIconsList':
				return '/retail/accounts/icons';
			case 'myAccountsWdg':
				return '/retail/accounts/balance';

			//Accounts with parameters 
			case 'customizeAcc':
				return '/retail/accounts/' + oUrlParams.param1
			case 'accStatement':
				return '/retail/accounts/' + oUrlParams.param1 + '/statement' + oUrlParams.param2 + '&offset=' + oUrlParams.param3 + '&size=' + oUrlParams.param4;
			case 'cardDeletion':
				return '/retail/accounts/' + oUrlParams.param1 + '/atmCard';
			case 'chequeCancellation':
				return '/retail/accounts/' + oUrlParams.param1 + '/stopChequeBook';
			case 'chequeRequest':
				return '/retail/accounts/' + oUrlParams.param1 + '/requestChequeBook';
			case 'accStmtRemarks':
				return '/retail/accounts/' + oUrlParams.param1 + '/statement/' + oUrlParams.param2;	
			case 'accStmtEmail':
				return '/retail/accounts/' + oUrlParams.param1 + '/statement/' + oUrlParams.param2 + '/email';	
				
			//currencyConverter	
			case 'getCurrencyList':	
				return '/retail/currency/list';
			case 'getCurrencyConverter':	
				return '/retail/currency?'+ oUrlParams.param1;

		}
	},
	
	/**
	 * Returns the URLs of the Ajax Calls, provided an identifier and parameters
	 * @param sId, an identifier with two parts: a number, "_" and the string identifier
	 * @param oUrlParams, an optional object with parameters for the url
	 * Example: core.io.getUrlLookUp( '3_accounts', { param1: 'idX543' } );
	 */
	getUrlLookUp: function ( sId, oUrlParams ){
		var nId = parseInt( sId.split('_')[0], 10 ), 
		aUrlResults = [
			'/retail/accounts' , 
			'/retail/accounts/icons', 
			'/retail/accounts/balance', 
			'/retail/accounts/' + oUrlParams.param1, 
			'/retail/accounts/' + oUrlParams.param1 + '/statement' + oUrlParams.param2 + '&offset=' + oUrlParams.param3 + '&size=' + oUrlParams.param4, 
			'/retail/accounts/' + oUrlParams.param1 + '/statement/' + oUrlParams.param2, 
			'/retail/currency?'+ oUrlParams.param1
		];
		
		return aUrlResults[ nId ];
	}
};
