// Throttling is a technique used to limit the number of times a function is called over a certain period of time.
// This can be useful when dealing with events that are triggered frequently, such as scrolling or resizing the window.
function throttle(fn, delay) {
    let wait = false;

    return (...args) => {
        if (!wait) {
            fn(...args);
            wait = true;
            // Restore wait flag after the delay
            setTimeout(() => {
                wait = false;
            }, delay);
        }
    };
}

// Usage
function myFunction() {
    console.log("Function called");
}

const throttledFunction = throttle(myFunction, 1000);

window.addEventListener("scroll", throttledFunction);

// Reference
// https://codedamn.com/news/javascript/throttling-in-javascript
