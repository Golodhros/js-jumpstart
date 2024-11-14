// Reference: https://www.patterns.dev/posts/singleton-pattern/
let count = 0;
let instance;

class Counter {
    constructor() {
        if (instance) {
            console.log("There is already an instance of Counter!");
        }
        instance = this;
    }

    getInstance() {
        return this;
    }

    getCount() {
        return count;
    }

    increment() {
        return ++count;
    }

    decrement() {
        return --count;
    }
}

// Freeze to avoid consumers changing properties or methods of the Counter instance
const singletonCounter = Object.freeze(new Counter());

export { singletonCounter };
