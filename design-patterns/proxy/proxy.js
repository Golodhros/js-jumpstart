const person = {
    name: "John Doe",
    age: 33,
};

const personProxy = new Proxy(person, {
    get: (obj, prop) => {
        console.log(`Value of ${prop} is ${obj[prop]}`);
    },
    set: (obj, prop, value) => {
        console.log(`Changed ${prop} from ${obj[prop]} to ${value}`);
        obj[prop] = value;
    },
});

// Use
personProxy.name; // The value of name is John Doe
personProxy.age = 43; // Changed age from 33 to 43

// Validation example
const validationProxy = new Proxy(person, {
    get: (obj, prop) => {
        if (!obj[prop]) {
            console.log(
                `Hmm.. this property doesn't seem to exist on the target object`
            );
        } else {
            console.log(`The value of ${prop} is ${obj[prop]}`);
        }
    },
    set: (obj, prop, value) => {
        if (prop === "age") {
            if (value < 0 || typeof value !== "number") {
                console.log("Error: provide a valid age value");
            } else {
                console.log(
                    `Changed value of ${prop} from ${obj[prop]} to ${value}`
                );
                obj[prop] = value;
            }
        } else if (prop === "name" && value.length < 2) {
            console.log("Error: provide a valid name value");
        } else {
            obj[prop] = value;
        }
    },
});

personProxy.nonExistentProperty; // Hmm.. this property doesn't seem to exist
personProxy.age = "44"; // Error: provide a valid age value
personProxy.name = ""; // Error: provide a valid name value

// Reflect example
const personProxy = new Proxy(person, {
    get: (obj, prop) => {
        console.log(`The value of ${prop} is ${Reflect.get(obj, prop)}`);
    },
    set: (obj, prop, value) => {
        console.log(`Changed ${prop} from ${obj[prop]} to ${value}`);
        Reflect.set(obj, prop, value);
    },
});
