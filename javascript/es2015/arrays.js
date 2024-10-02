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

