// Ref: https://medium.com/frontmen/art-of-debugging-with-chrome-devtools-ab7b5fd8e0b4
(function () {
    'use strict';

    var element = document.createElement('script');
    element.src = "https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.15.0/lodash.min.js";
    element.type = "text/javascript";
    document.head.appendChild(element);
})();