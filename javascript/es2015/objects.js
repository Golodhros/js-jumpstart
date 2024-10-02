// OBJECTS
// Names of all enumerable properties as an array
[...Reflect.enumerate(object)]

// Values
Object.keys(object).map(key => object[key])

// Create a new object with the given prototype and properties
Object.assign(Object.create(proto), properties)

// Create a new object from merged own properties
{ ...source, a: false }

// Create a shallow clone of own properties of an object
{ ...object }

