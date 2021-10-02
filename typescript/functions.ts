// Typing Functions

// Regular function, return annotation is optional
function add(a: number, b: number): number {
    return a + b;
}

// Named function
function greet(name: string) {
    return "hello " + name;
}

// Function expression
let greet2 = function (name: string) {
    return "hello " + name;
};

// Arrow function expression
let greet3 = (name: string) => {
    return "hello " + name;
};

// Shorthand arrow function expression
let greet4 = (name: string) => "hello " + name;

// Function constructor
let greet5 = new Function("name", 'return "hello " + name');

// Optional parameters
function log(message: string, userId?: string) {
    let time = new Date().toLocaleTimeString();
    console.log(time, message, userId || "Not signed in");
}
// Default parameters
function buildName(firstName: string, lastName = "Smith") {
  return firstName + " " + lastName;
}

// Variadic functions
function sumVariadicSafe(...numbers: number[]): number {
    return numbers.reduce((total, n) => total + n, 0);
}

sumVariadicSafe(1, 2, 3); // evaluates to 6

// Typing this
function fancyDate(this: Date) {
    return ${this.getDate()}/${this.getMonth()}/${this.getFullYear()}
}


// Type Signatures or Call Signatures
// function greet(name: string)
type Greet = (name: string) => string

// function sumVariadicSafe(...numbers: number[]): number
type SumVariadicSafe = (...numbers: number[]) => number

// function log(message: string, userId?: string)
type Log = (message: string, userId?: string) => void

let log: Log = (
  message,
  userId = 'Not signed in'
) => {
  let time = new Date().toISOString()
  console.log(time, message, userId)
}

// Rest parameters
function buildName(firstName: string, ...restOfName: string[]) {
    return firstName + " " + restOfName.join(" ");
}

// employeeName will be "Joseph Samuel Lucas MacKinzie"
let employeeName = buildName("Joseph", "Samuel", "Lucas", "MacKinzie");

let buildNameFun: (fname: string, ...rest: string[]) => string = buildName;


// Overloaded Functions
type Reserve = {
    (from: Date, to: Date, destination: string): Reservation
    (from: Date, destination: string): Reservation
}

let reserve: Reserve = (
    from: Date,
    toOrDestination: Date | string,
    destination?: string
) => {
    if (toOrDestination instanceof Date && destination !== undefined) {
        // Book a one-way trip
    } else if (typeof toOrDestination === 'string') {
        // Book a round trip
    }
}


// Reference
// https://learning.oreilly.com/library/view/programming-typescript/9781492037644/ch04.html
