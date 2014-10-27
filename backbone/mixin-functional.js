// Functional mixin
var DraggableMixin = function(config){
    this.startDrag = function(){};
    this.onDrag = function(){};

    return this;
}

// DraggableMixin method is called passing the config object
DraggableMixin.call(UserItemView.prototype, { foo: 'bar' });
SortableMixin.call(UserItemView.prototype);

new UserItemView().startDrag();

// The this function always referes to the receiver, UserItemView
// This way the _.extend() method is no longer needed and the mixin methods
// are not copied this time but are cloned instead. The functions are
// redefined every time the mixin is used. This could be minified by caching:

// Caching mixin functions

// Functional mixin with cache
// We can cache the initial function definitions by wrapping up the mixin in
// a closure
var DraggableMixin = (function(){
    var startDrag = function(){};
    var onDrag = function(){};

    return function(config){
        this.startDrag = startDrag;
        this.onDrag = onDrag;

        return this;
    };
})();

// This raises another concern, how are we going to use the config object
// that we are passing?

// Using curry to combine a function and arguments
// Definition of curry
Function.prototype.curry = function(){
    var slice = Array.prototype.slice,
        args = slice.apply(arguments),
        that = this;

    return function(){
        return that.apply(null, argus.concat(slice.apply(arguments)));
    };
};

// Functional mixin with cache
var DraggableMixin = (function(){
    var startDrag = function(options){
        console.log('Options = ', options);
    };
    var onDrag = function(){};

    return function(config){
        this.startDrag = startDrag.curry(config):
        this.onDrag = onDrag;

        return this;
    };
})();

DraggableMixin.call(UserItemView.prototype, { foo: 'bar' });