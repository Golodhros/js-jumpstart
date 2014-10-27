/*
 * Modular Patters for jQuery projects
 * REF: http://www.codethinked.com/preparing-yourself-for-modern-javascript-development
 */

/*
 * IIFE (Immediately Invoked Function Expression)
 * In order to guarantee that nothing messes with the window variable,
 * we can pass the window object as a parameter to our IIFE.
 * We can do the same thing with references to libraries or even the value ‘undefined’. Our IIFE ends up looking like this:
 */
(function(window, $, undefined){
  //do some work
})(window, jQuery);


/**
 * Namespaces
 */
window.myApp = window.myApp || {};
window.myApp.someFunction = function(){
  //so some work
};

/* Combining both */
(function(myApp, $, undefined){
  //do some work
}(window.myApp = window.myApp || {}, jQuery));

/* or */

window.myApp = (function(myApp, $, undefined){
  //do some work
  return myApp;
})(window.myApp || {}, jQuery);


/**
 * Revealing Module Pattern
 */
var myModule = (function($, undefined){
  var myVar1 = '',
  myVar2 = '';

  var someFunction = function(){
    return myVar1 + " " + myVar2;
  };

  return {
    myVar1: myVar1, //myVar1 made public
    someFunction: someFunction //some function made public
  }
})(jQuery);