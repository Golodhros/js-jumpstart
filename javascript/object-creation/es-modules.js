// math.js
export function add(x, y) {
    return x + y;
}

export function multiply(x) {
    return x * 2;
}

export function subtract(x, y) {
    return x - y;
}

export default function square(x) {
    return x * x;
}

// index.js
import square, {
    add as addValues,
    multiply as multiplyValues,
    subtract,
    square,
} from "./math.js";

function add(...args) {
    return args.reduce((acc, cur) => cur + acc);
}

function multiply(...args) {
    return args.reduce((acc, cur) => cur * acc);
}

/* From math.js module */
addValues(7, 8);
multiplyValues(8, 9);
subtract(10, 3);
square(3);

// OR
import * as math from "./math.js";

math.default(7, 8);
math.multiply(8, 9);
math.subtract(10, 3);
math.square(3);
