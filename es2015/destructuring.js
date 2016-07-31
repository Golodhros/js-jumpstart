// Destructuring Objects

// Contruct

// Single values
let jane = {};
jane.first = 'Jane';
jane.last = 'Doe';

// Multiple values
let jane = {
    first: 'Jane',
    last: 'Doe'
};

// Extract

// Single values
let f = jane.first;
let l = jane.last;

// Multiple values
let obj = { first: 'Jane', last: 'Doe'};
let { first: f, last: l } = obj;
//  f='Jane', l='Doe'

// Nested destructuring
let address = {
    city: 'Salt Lake City',
    state: 'UT',
    coords: {
        lat: 40.767,
        long: -111.92
    }
}
let {coords:{lat: lt, long:lg}} = address
// lt = 40.767, lg=-111.92


// Destructuring Arrays

let [x, y] = ['a', 'b'];
// x='a', y='b'

let [x, y, ...rest] = ['a', 'b', 'c', 'd'];
// x ='a', y='b', rest = ['c', 'd']

// swap values
[x,y] = [y,x];

// Regexp trick
let [all, year, month, day] =
    /^(\d\d\d\d)-(\d\d)-(\d\d)$/.exec('2999-12-31');

