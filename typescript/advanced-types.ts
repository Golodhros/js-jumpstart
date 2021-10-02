// Unions and Intersections
type Cat = { name: string; purrs: boolean };
type Dog = { name: string; barks: boolean; wags: boolean };
type CatOrDogOrBoth = Cat | Dog;
type CatAndDog = Cat & Dog;


// Type Assertions
let someValue: any = "this is a string”;
let strLength: number = (someValue as string).length;


// Type Guards
function isFish(pet: Fish | Bird): pet is Fish {
    return (pet as Fish).swim !== undefined;
}

// We can use typeof guards directly too
function padLeft(value: string, padding: string | number) {
    if (typeof padding === "number") {
        return Array(padding + 1).join(" ") + value;
    }
    if (typeof padding === "string") {
        return padding + value;
    }
    throw new Error(`Expected string or number, got '${padding}'.`);
}

// We can use also instanceof
// Type is 'SpaceRepeatingPadder | StringPadder'
let padder: Padder = getRandomPadder();

if (padder instanceof SpaceRepeatingPadder) {
    padder; // type narrowed to 'SpaceRepeatingPadder'
}
if (padder instanceof StringPadder) {
    padder; // type narrowed to 'StringPadder'
}


// Index Types
// No types:
function pluck(o, propertyNames) {
    return propertyNames.map(n => o[n]);
}

// With Index types:
function pluck<T, K extends keyof T>(o: T, propertyNames: K[]): T[K][] {
  return propertyNames.map(n => o[n]);
}

interface Car {
    manufacturer: string;
    model: string;
    year: number;
}
let taxi: Car = {
    manufacturer: 'Toyota',
    model: 'Camry',
    year: 2014
};

// Manufacturer and model are both of type string,
// so we can pluck them both into a typed string array
let makeAndModel: string[] = pluck(taxi, ['manufacturer', 'model']);

// If we try to pluck model and year, we get an
// array of a union type: (string | number)[]
let modelYear = pluck(taxi, ['model', 'year'])

// A simpler example
function getProperty<O extends object, K extends keyof O>(o: O, k: K): O[K] {
    return o[k];
}


// Mapped Types
interface PersonPartial {
    name?: string;
    age?: number;
}
interface PersonReadonly {
    readonly name: string;
    readonly age: number;
}

// or
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
}
type Partial<T> = {
    [P in keyof T]?: T[P];
}

type PersonPartial = Partial<Person>;
type ReadonlyPerson = Readonly<Person>;



// Exclusive combinations
type MutuallyExclusive<T, U> = (T & Not<U>) | (U & Not<T>);

// Example
type ComponentProps = ComponentPropsBase &
MutuallyExclusive<OneProp, OtherProp>




// Type predicate
function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
    return value !== null && value !== undefined;
}

const array: (string | null)[] = ['foo', 'bar', null, 'zoo', null];
const filteredArray: string[] = array.filter(notEmpty);
