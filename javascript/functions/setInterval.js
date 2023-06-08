// JavaScript's setInterval() function is commonly used to set a delay for functions that are executed again and again, such as animations
//
// However, there are some problems associated with using setInterval():
// 1. One problem with setInterval() is that it can break the rhythm in case of time-intensive synchronous operations. If the function
// takes longer than the delay mentioned in setInterval(), it can cause the function to miss its target by any amount of time. This can
// disproportionately delay queued tasks or, in the worst case, lock the web page.
// 2. Another problem with setInterval() is that if any error occurs in the code block, it will not stop execution but keeps on running
//  faulty code. This can cause unexpected behavior and make debugging difficult.
// 3. With setInterval(), we don't have control over modifying the delay from iteration
// to iteration.

const mySetInterval = (fn, delay) => {
    let intervalId = null;

    const _setInterval = (fn, delay) => {
        intervalId = setTimeout(() => {
            fn();
            intervalId = _setInterval(fn, delay);
        }, delay);

        return intervalId;
    };

    function clear() {
        clearTimeout(intervalId);
    }

    intervalId = _setInterval(fn, delay);

    return clear;
};

const clear = mySetInterval(() => {
    console.log("hey");
}, 1000);

setTimeout(() => {
    clear();
}, 4000);

// Nested timeouts directly
let timer = setTimeout(function myTimer() {
    console.log("timer");
    timer = setTimeout(myTimer, 1000);
}, 1000);
