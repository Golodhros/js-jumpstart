const currying = (fn) => {
    const arity = fn.length;

    return function f1(...args) {
        if (args.length >= arity) {
            return fn(...args);
        } else {
            return function f2(...moreArgs) {
                const sumArgs = [...args, ...moreArgs];

                return f1(...sumArgs);
            };
        }
    };
};

const multiply = (a, b) => a * b;

const multiplyCurried = currying(multiply);
const multiplyBy2 = multiplyCurried(2);
const four = multiplyBy2(2);

// Another example
const get = (property, object) => object[property];
const getCurried = curry(get);
const getId = getCurried('id');
const map = curry((fn, values) = values.map(fn));
const getIds = map(getId);
