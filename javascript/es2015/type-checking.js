
// Float
function isFloat(x) {
    return Number.isFinite( x ) && !Number.isInteger( x );
}

// Array
Array.isArray(object)

// Check if an object is a finite Number
Number.isFinite(object)


// Iterables
function isIterable(object) {
    return typeof object[Symbol.iterator] === "function";
}