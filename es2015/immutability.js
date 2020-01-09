// ES2015 const is not about immutability
// const creates an immutable "binding"

// This is valid code
const foo = {};
foo.bar = 42;
console.log(foo.bar);
// → 42

// ES2015 const has nothing to do with immutability of values,
// is about the immutability of the binding

// To make an object’s values immutable, use Object.freeze()
const foo = Object.freeze({
     'bar': 27
});
foo.bar = 42; // throws a TypeError exception in strict mode;
              // silently fails in sloppy mode
console.log(foo.bar);
// → 27

// Note that Object.freeze() is shallow and only works
// on property-value pairs. There is no way of doing Dates, Maps or Sets immutable.

// Given the above, const makes code easier to read: within its scope,
// a const variable always refers to the same object.
// With let there is no such guarantee.
// As a result, it makes sense to use let and const as follows in your ES6 code:
// use const by default
// only use let if rebinding is needed
// (var shouldn’t be used in ES6)


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
