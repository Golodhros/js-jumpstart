function cutsTheMustard(){
    return 'querySelector' in document && 'localStorage' in window && 'addEventListener' in window
}

if(cutsTheMustard()){
    var s = document.createElement('script');
    s.src = 'curl.js';
    s.onload = function(){
        require('script1.js');
        require('script2.js');
    };
    s.async = true;
    document.head.insertBefore(s, document.head.childNodes[0]);
}