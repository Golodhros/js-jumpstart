// Ref: https://www.jonathancreamer.com/for-of-loops-in-javascript-one-loop-to-rule-them-all/

// Looping over objects is usually done by:
Object.keys(obj).map(key => {
    let value = map[key];
});


// Arrays
const arrayOfStuff = ["thing one", "thing two", "thing three"];

for (const thing of arrayOfStuff) {
    console.log(thing);
}


// Arrays of Objects
const arrayOfObjectsOfStuff = [
    { name: "thing one" },
    { name: "thing two" },
    { name: "thing three" }
];

for (const { name } of arrayOfObjectsOfStuff) {
    console.log(name);
}


// Objects
const userMap = {
    "123": "user 1",
    "456": "user 2",
    "789": "user 3"
};

for (const [id, name] of Object.entries(userMap)) {
    console.log(id, name);
}

// Thanks to Object.entries, which in this case produces:
[
    [123, "user 1"],
    [456, "user 2"],
    [789, "user 3"]
];


// Map
const actualMapOfUsers = new Map();

actualMapOfUsers.set("123", "user 1");
actualMapOfUsers.set("456", "user 2");
actualMapOfUsers.set("7899", "user 3");

for (const [id, name] of Array.from(actualMapOfUsers)) {
    console.log(id, name);
}
// As Array.from(<Map>) gives us an array of key/value pairs
