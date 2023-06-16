/*
Debounce returns a function, that, as long as it continues to be invoked, will not
be triggered. The function will be called after it stops being called for
N milliseconds.

input.addEventListener('keydown', search);
keydown     | |      |
time     ---------------->
search      | |      |

input.addEventListener('keydown', debounce(search, 100));
keydown    | |      |
time     ---------------->
search           |      |
             |100|  |100|

*/
function debounce(fn, delay) {
    let id;

    return (...args) => {
        clearTimeout(id);

        id = setTimeout(() => {
            fn(...args);
        }, delay);
    };
}

// Usage
function myFunction() {
    console.log("Function called");
}

const debouncedFunction = debounce(myFunction, 1000);

document.getElementById("button").addEventListener("click", debouncedFunction);

// Reference
// https://codedamn.com/news/javascript/throttling-in-javascript
