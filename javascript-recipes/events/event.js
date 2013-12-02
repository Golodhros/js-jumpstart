/**
 * Normalizes the different event attachment process
 * @param el Anchor element to apply the event
 * @param type Type of event to attach
 * @param fn Function Callback to execute on event trigger
 */
var addEvent = (function () {
   var filter = function(el, type, fn) {
      for ( var i = 0, len = el.length; i < len; i++ ) {
         addEvent(el[i], type, fn);
      }
   };
   if ( document.addEventListener ) {
      return function (el, type, fn) {
         if ( el && el.nodeName || el === window ) {
            el.addEventListener(type, fn, false);
         } else if (el && el.length) {
            filter(el, type, fn);
         }
      };
   }

   return function (el, type, fn) {
      if ( el && el.nodeName || el === window ) {
         el.attachEvent('on' + type, function () { return fn.call(el, window.event); });
      } else if ( el && el.length ) {
         filter(el, type, fn);
      }
   };
})();

//Event attachement example
//addEvent(uls, 'click', function() {
//   var target = e.target || e.srcElement;
//   if ( target && target.nodeName === 'A' ) {
//      // proceed
//   }
//});