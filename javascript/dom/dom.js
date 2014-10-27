"use strict";
/**
 * Simple DOM querying operations in legacy Javascript
 * Ref: http://net.tutsplus.com/tutorials/javascript-ajax/from-jquery-to-javascript-a-reference/
 */

var core = core === undefined ? {} : core;

core.dom = {

	config : {
		debug: true
	},

	/**
	 * Object Initialization
	 * @param config
	 */
	init : function( config ) {
	},

	//
	$id: function( sId ){
		if ( !sId ) {
			return this;
		}
    document.querySelector('#')
		return document.getElementById(sId);
	},

	/**
	 * Tag selector
	 * @param {Object} sTag HTML Tag identifier
	 * @method $tag
	 */
	$tag: function(sTag){
		if ( !sTag ) {
			return this;
		}
		return document.getElementByTag(sTag);
	},

	/**
	 * Class checking
	 * @param {Object} el Anchor
	 * @param {Object} cl Class to check if present
	 * @method hasClass
	 */
	hasClass: function (el, sClass) {
        var regex = new RegExp('(?:\\s|^)' + sClass + '(?:\\s|$)');
        return !!el.className.match(regex);
    },

 	/**
 	 * Adds a class to the given anchor
 	 * @param {Object} el Anchor
 	 * @param {Object} cl Class to add
 	 * @method addClass
 	 */
    addClass: function (el, sClass) {
        el.className += ' ' + sClass;
    },

	/**
	 * Removes a class from the given anchor
	 * @param {Object} el Anchor
	 * @param {Object} sClass Class to remove
	 * @method removeClass
	 */
    removeClass: function (el, sClass) {
        var regex = new RegExp('(?:\\s|^)' + sClass + '(?:\\s|$)');
        el.className = el.className.replace(regex, ' ');
    },

 	/**
 	 * Toggles a Class over the given anchor
 	 * @param {Object} el Anchor
 	 * @param {Object} sClass Class to toggle
 	 * @method toggleClass
 	 */
    toggleClass: function (el, sClass) {
        this.hasClass(el, sClass) ? this.removeClass(el, sClass) : this.addClass(el, sClass);
    },

	/**
	 * Return the next element of the given
	 * @param {Object} el Anchor
	 * @method next
	 */
	next: function (el){
		var next = el.nextSibling;
		while (next.nodeType>1)
			next = next.nextSibling;
		return next;
	}
};

/**
 * $ Implementation
 * @param {Object} cb
 */
if ( !document.getElementsByClassName ) {
   document.getElementsByClassName = function(cl, tag) {
      var els, matches = [],
         i = 0, len,
         regex = new RegExp('(?:\\s|^)' + cl + '(?:\\s|$)');

      // If no tag name is specified,
      // we have to grab EVERY element from the DOM
      els = document.getElementsByTagName(tag || "*");
      if ( !els[0] ) return false;

      for ( len = els.length; i < len; i++ ) {
         if ( els[i].className.match(regex) ) {
            matches.push( els[i]);
         }
      }
      return matches; // an array of elements that have the desired classname
   };
}

// Very simple implementation. We're only checking for an id, class, or tag name.
// Does not accept CSS selectors in pre-querySelector browsers.
var $ = function(el, tag) {
   var firstChar = el.charAt(0);

   if ( document.querySelectorAll ) return document.querySelectorAll(el);

   switch ( firstChar ) {
      case "#":
         return document.getElementById( el.slice(1) );
      case ".":
         return document.getElementsByClassName( el.slice(1), tag );
      default:
         return document.getElementsByTagName(el);
   }
};

// Usage
//$('#container');
//$('.box'); // any element with a class of box
//$('.box', 'div'); // look for divs with a class of box
//$('p'); // get all p elements


/**
 * Document Ready
 * @param {Object} cb
 */
// http://dustindiaz.com/smallest-domready-ever
function ready(cb) {
   /in/.test(document.readyState) // in = loadINg
      ? setTimeout('ready('+cb+')', 9)
      : cb();
}

//Example
//ready(function() {
//// grab something from the DOM
//});