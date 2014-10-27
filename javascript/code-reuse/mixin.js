// Composition not inheritance
var MIXIN = function(base, extendme){
    var prop;
    for(prop in base){
        if(typeof base[prop] === 'function'
            && !extendme[prop]){
            extendme[prop] = base[prop].bind(base);
        }
    }
};