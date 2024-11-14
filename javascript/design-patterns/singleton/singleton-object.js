// Reference: https://www.patterns.dev/posts/singleton-pattern/
let count = 0;

const counter = Object.freeze({
    increment() {
        return ++count;
    },
    decrement() {
        return --count;
    },
    getCount() {
        return count;
    },
});

export { counter };
