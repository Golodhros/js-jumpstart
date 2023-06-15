// Reference: https://medium.com/javascript-scene/reduce-composing-software-fe22f0c39a1d

const compose =
    (...fns) =>
    (x) =>
        fns.reduceRight((v, f) => f(v), x);

// Example of use:
const add1 = (n) => n + 1;
const double = (n) => n * 2;
const add1ThenDouble = compose(double, add1);

add1ThenDouble(2); // 6
// ((2 + 1 = 3) * 2 = 6)

// OR

const pipe =
    (...fns) =>
    (x) =>
        fns.reduce((v, f) => f(v), x);

const add1ThenDouble = pipe(add1, double);

add1ThenDouble(2); // 6
// ((2 + 1 = 3) * 2 = 6)
