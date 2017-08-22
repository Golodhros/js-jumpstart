
// ARRAYS
// Check if array includes an element
array.includes(element)

// Convert an array-like object to array
[...arguments]

// Add arr2 items to end of array
arr1.push(...arr2)

// Add arr2 items to beginning of array
arr1.unshift(...arr2)

// Combine 2 arrays
var parts = ['two', 'three'];
var lyrics = ['one', ...parts, 'four', 'five'];
// lyrics = ["one", "two", "three", "four", "five"]


// Convert arguments or NodeList to Array
[...document.querySelectorAll('div')]

// Use maths functions
let numbers = [9, 4, 7, 1];
Math.min(...numbers);
// 1

// Create a copy of an array with all falsy values removed
array.filter(x => !!x)

// Create a copy of an array with duplicates removed
[...new Set(array)]

const uniq = (arrArg) => arrArg.filter((elem, pos, arr) => arr.indexOf(elem) == pos);


// Find the index in an array by predicate
[4, 6, 7, 12].findIndex(isPrime);

// Create an array with n numbers, starting from x
Array.from(Array(n), (v, k) => k + x)


// OBJECTS
// Names of all enumerable properties as an array
[...Reflect.enumerate(object)]

// Values
Object.keys(object).map(key => object[key])

// Create a new object with the given prototype and properties
Object.assign(Object.create(proto), properties)

// Create a new object from merged own properties
{ ...source, a: false }

// Create a shallow clone of own properties of an object
{ ...object }


// Identity function
value => value

// A function that returns a value
() => value

// ... instead of .apply()
function doStuff (x, y, z) { }
var args = [0, 1, 2];

// Call the function, passing args
doStuff.apply(null, args);

doStuff(...args);


// Pipe function
const pipe = (...fns) => x => fns.reduce((y, f) => f(y), x);


// Immutable Operations

// Array Operations
const removeLastItem = (items) => {
    return items.slice(0, -1);
}

const removeFirstItem = (items) => {
    const [last, ...rest] = items;
    return rest;
}

const removeItemById = (items, id) => items.filter(item => item.id !== id);


// Object Operations
const toggleTodo = (todo) => ({
    ...todo,
    completed: !todo.completed
});

const addTodo = (todos, todo) => ({
    ...todos,
    [todo.id]: todo
});

const removeTodo = (state = {}, { type, id }) => {
  switch (type) {
    case 'removeTodo':
      const {[id]: remove, ...rest} = state;
      return rest;
    default:
      return state;
  }
};
