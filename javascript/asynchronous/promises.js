// Ref: https://medium.com/datafire-io/es6-promises-patterns-and-anti-patterns-bbb21a5d0918

// Running Promises in series
// We'll wait for each promise to resolve before going on
let itemIDs = [1, 2, 3, 4, 5];

itemIDs.reduce((promise, itemID) => {
    return promise.then(_ => api.deleteItem(itemID));
}, Promise.resolve());

// Which translates to:
// Promise.resolve()
// .then(_ => api.deleteItem(1))
// .then(_ => api.deleteItem(2))
// .then(_ => api.deleteItem(3))
// .then(_ => api.deleteItem(4))
// .then(_ => api.deleteItem(5));