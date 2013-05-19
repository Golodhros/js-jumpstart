/**
 * Core framework helpers
 * Index:
 * 	- addURLParam
 * 	- betterTypeOf
 *  - customTrim
 *  - leftTrim
 *  - logMsg
 *  - rightTrim
 */

var core = core === undefined ? {} : core;

core = {
	config : {
		debug: true
	},

	/**
	 * Object Initialization
	 * @param config
	 */
	init : function( config ) {
	},

	/**
	 * Adds a paramater to the given URL
	 */
	addURLParam: function( url, name, value ) {
		url += ( url.indexOf( '?' ) == -1 ? '?' : ' & ' );
		url += encodeURIComponent( name ) + '=' + encodeURIComponent( value );
		return url;
	},

	/**
	 * Useful method for type validation
	 */
	betterTypeOf: function( input ){
        return Object.prototype.toString.call(input).match(/^\[object\s(.*)\]$/)[1];
    },

	/**
	 * makes a trim over the string
	 * @param targetString
	 */
	customTrim: function ( targetString ){
		 return targetString.replace(/^\s+|\s+$/g, "");
	},

	/**
	 * ltrim removes spaces or given chars at the start of the string
	 * @param targetString
	 */
    leftTrim: function(str, chars) {
        chars = chars || "\\s";
        return str.replace(new RegExp("^[" + chars + "]+", "g"), "");
    },

	/**
	 * Nofifies a message in the console if we are in debug mode
	 */
	logMsg: function(message){
		if( core.config.debug ){
			if (typeof console == "object"){
				console.log(message);
			} else if (typeof opera == "object"){
				opera.postError(message);
			} else if (typeof java == "object" && typeof java.lang == "object"){
				java.lang.System.out.println(message);
			}
		}
	},

    /**
	 * rtrim removes spaces or given chars at the end of the string
	 * @param targetString
	 */
    rightTrim: function(str, chars) {
        chars = chars || "\\s";
        return str.replace(new RegExp("[" + chars + "]+$", "g"), "");
    }

};