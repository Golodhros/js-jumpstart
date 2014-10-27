/**
 * Prototypal Inheritance
 *
 * In this pattern there are no classes involved; here objects inherit from other
 * objects. You can think about it this way: you have an object that you would like to
 * reuse and you want to create a second object that gets its functionality from the first one.
 *
 * Reference:   http://javascript.crockford.com/prototypal.html
 * 				Reference: Javascript Patterns by Stoyan Stefanov, pg 131
 */
if (typeof Object.create !== 'function') {
    Object.create = function (o) {
        function F() {}
        F.prototype = o;
        return new F();
    };
}

// Example
// object to inherit from
var parent = {
	name: "Papa"
};
// the new object
var child = object(parent);
// testing
alert(child.name); // "Papa"