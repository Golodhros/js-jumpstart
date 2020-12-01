// Generic Identity Function
function identity<T>(arg: T): T {
    return arg;
}

// Generic Identity Interface
interface GenericIdentityFn {
    <T>(arg: T): T;
}

let myIdentity: GenericIdentityFn = identity;


// Generic Classes
class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) { return x + y; };

// Constraining Generics
interface Lengthwise {
    length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);  // Now we know it has a .length property, so no more error
    return arg;
}

// Object with index
export type WithIndex<TObject> = TObject & Record<string, any>;


// Using Type Parameters to constrain a generic
function getProperty<T, K extends keyof T>(obj: T, key: K) {
    return obj[key];
}

let x = { a: 1, b: 2, c: 3, d: 4 };

getProperty(x, "a"); // okay
getProperty(x, "m"); // error: Argument of type 'm' isn't assignable to 'a' | 'b' | 'c' | 'd'.


// Generics
type Filter = {
    <T>(array: T[], f: (item: T) => boolean): T[]
}
// This function filter uses a generic type parameter T; we don’t know what this type will be ahead of time, so
// TypeScript if you can infer what it is each time we call filter that would be swell.

let filter: Filter = (array, f) => // ...

// (a) T is bound to number
filter([1, 2, 3], _ => _ > 2)

// (b) T is bound to string
filter(['a', 'b'], _ => _ !== 'b')

// (c) T is bound to {firstName: string}
let names = [
  {firstName: 'beth'},
  {firstName: 'caitlyn'},
  {firstName: 'xin'}
]
filter(names, _ => _.firstName.startsWith('b'))

// When can you call generics?
type Filter = {
    <T>(array: T[], f: (item: T) => boolean): T[]
}
let filter: Filter = // ...

type Filter<T> = {
    (array: T[], f: (item: T) => boolean): T[]
}
let filter: Filter<number> = // ...

type Filter = <T>(array: T[], f: (item: T) => boolean) => T[]
let filter: Filter = // ...

type Filter<T> = (array: T[], f: (item: T) => boolean) => T[]
let filter: Filter<string> = // ...

function filter<T>(array: T[], f: (item: T) => boolean): T[] {
     // ...
}
