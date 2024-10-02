// Modules
// Webpack, JSPM, Browserify

// Every module is a file, you can't have multiple modules per file

// Named Exports
// lib/math.js
let notExported = 'abc';
export function square(x) {
    return x * x;
}
export const MY_CONSTANT = 123;

// main1.js
import {square, MY_CONSTANT} from 'lib/math';
console.log(square(3));

// main2.js
import * as math from 'lib/math';
console.log(math.square(3));

// Default Exports
// myFunc.js
export default function(...) { ... }

// main1.js
import myFunc from 'myFunc';

// MyClass.js
export default class { ... }

// main2.js
import MyClass from 'MyClass';