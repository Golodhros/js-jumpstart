// To Clone objects
const simpleObject = { a: 1, b: 2 };
const nestedObject = { a: 1, b: { c: 2 } };
const nestedArray = [1, [2, 3]];

// 1.- Simple Objects
const clone = { ...simpleObject };
const clone2 = Object.assign({}, simpleObject);

// 2.- Nested Objects

// This won't work with values like functions and DOM elements
const cloneWithJSON = JSON.parse(JSON.stringify(nestedObject));

// Needs Lodash
const cloneWithLoDash = _.cloneDeep(nestedObject);

// Custom clone function
const cloneDeep = (original) => {
    if (typeof original !== "object" || original === null) {
        return original;
    }

    const initialObject = Array.isArray(original) ? [] : {};

    return Object.keys(original).reduce((acc, key) => {
        acc[key] = cloneDeep(original[key]);

        return acc;
    }, initialObject);
};

const simpleObjectCloned = cloneDeep(simpleObject);
console.log(simpleObjectCloned);

const nestedObjectCloned = cloneDeep(nestedObject);
nestedObject.b.c = 4;
console.log(nestedObjectCloned);

const nestedArrayCloned = cloneDeep(nestedArray);
console.log(nestedArrayCloned);
