class Observable {
    constructor() {
        this.observers = [];
    }

    subscribe(func) {
        this.observers.push(func);
    }

    unsubscribe(func) {
        this.observers = this.observers.filter((observer) => observer !== func);
    }

    notify(data) {
        this.observers.forEach((observer) => observer(data));
    }
}

function logger(data) {
    console.log(`${Date.now()} ${data}`);
}

const observable = new Observable();

observable.subscribe(logger);

//...

function handleClick() {
    observable.notify("User clicked button!");
}
