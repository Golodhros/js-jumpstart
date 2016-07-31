// Error First Callbacks
// If you pass a function to another function (a.k.a. higher order function)
// as a parameter, within the function you can call it when you are finished with
// your job. No return values, only calling another function with the values.
Something.save(function(err) {
    if (err)  {
        //error handling
        return;
    }
    console.log('success');
});

// Promises
// A promise represents the eventual result of an asynchronous operation.

// Example
Something.save()
  .then(function() {
    console.log('success');
  })
  .catch(function() {
    //error handling
  })

// Use them when dealing with callback interfaces:
// You need to wrap the callback the original function
// call with a Promise
function saveToTheDb(value) {
    return new Promise(function(resolve, reject) {
        db.values.insert(value, function(err, user) { // remember error first ;)
            if (err) {
                return reject(err); // don't forget to return here
            }
            resolve(user);
        })
    }
}

// If building a library, you maybe want to support both
function foo(cb) {
    if (cb) {
        return cb();
    }
    return new Promise(function (resolve, reject) {

    });
}

// Generators/Yield
// Wouldn't it be nice, that when you execute your function, you could pause it at
// any point, calculate something else, do other things, and then return to it, even with some value and continue?
// When we call a generator function it doesn't start running, we will have to iterate through it manually.
function* foo () {
    var index = 0;
    while (index < 2) {
        yield index++;
    }
}
var bar =  foo();

console.log(bar.next());    // { value: 0, done: false }
console.log(bar.next());    // { value: 1, done: false }
console.log(bar.next());    // { value: undefined, done: true }

// Async/await
// As you can see to use an async function you have to put the async keyword
// before the function declaration. After that, you can use the await keyword inside your newly created async function.
async function save(Something) {
    try {
        await Something.save()
    } catch (ex) {
        //error handling
    }
    console.log('success');
}