// Curryed functions
const add = a => b => a + b;
const add2 = add(2);
add2(1);
// 3

// Partial Application
const sayHelloTo = name => greet('hello', name);
sayHelloTo('fred');
// "hello fred"

// Util functions
const constant = x => () => x;
const identity = x => x;
const noop = () => undefined;


// Chaining
const pipeline = [
  array => { array.pop(); return array; },
  array => array.reverse()
];

pipeline.reduce((xs, f) => f(xs), [1, 2, 3]);

// We can encapsulate it
const pipe = functions => data => {
  return functions.reduce(
    (value, func) => func(value),
    data
  );
};

// More compact version
const pipe = (...fns) => x => fns.reduce((y, f) => f(y), x);

const pipeline = pipe([
  x => x * 2,
  x => x / 3,
  x => x > 5,
  b => !b
]);

pipeline(5);
// true
pipeline(20);
// false


// ... instead of .apply()
function doStuff (x, y, z) { }
var args = [0, 1, 2];

// Call the function, passing args
doStuff.apply(null, args);

doStuff(...args);
