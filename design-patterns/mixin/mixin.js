// Composition not inheritance
// Stoyan Stefanov - JavaScript Patterns
// https://learning.oreilly.com/library/view/javascript-patterns/9781449399115/ch06.html#:-:text=Mix-ins
var MIXIN = function (base, extendme) {
    var prop;
    for (prop in base) {
        if (typeof base[prop] === "function" && !extendme[prop]) {
            extendme[prop] = base[prop].bind(base);
        }
    }
};
