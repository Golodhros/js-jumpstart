// Ref: Functional Programming in JavaScript
// We can create type safety functions that either return the variable
// or throw an error. This fulfils the object axiom of categories.
var typeOf = function(type) {
        return function(x) {
            if (typeof x === type) {
                return x;
            } else {
                throw new TypeError("Error: "+type+" expected, "+typeof x+" given.");
            }
        };
    },
    str = typeOf('string'),
    num = typeOf('number'),
    func = typeOf('function'),
    bool = typeOf('boolean');

// Use example
var x = '24';
x + 1; // returns 241

function plusplus(n) {
    return num(x) + 1;
}
plusplus(x); // throws error

// you can also do
num(str('hola').length);


// For objects
var objectTypeOf = function(name) {
        return function(o) {
            if (Object.prototype.toString.call(o) === "[object "+name+"]") {
                return o;
            } else {
                throw new TypeError("Error: "+name+" expected, something else given.");
            }
        };
    },
    obj = objectTypeOf('Object'),
    arr = objectTypeOf('Array'),
    date = objectTypeOf('Date'),
    div = objectTypeOf('HTMLDivElement');