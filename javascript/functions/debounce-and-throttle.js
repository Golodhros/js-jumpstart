/*
Debounce

button.addEventListener('click, submit);
click   || |   | |
time    ============>
submit  || |   | |

const debouncedSubmit = debounce(submit, DELAY);
button.addEventListener('click, debouncedSubmit);
click   || |       | |
time    ================>
submit           |
           |DELAY   |

*/

function debounce(fn, delay) {
    let timerId;

    return (...args) => {
        clearTimeout(timerId);

        timerId = setTimeout(() => {
            fn(...args);
        }, delay);
    };
}

/*
Throttle

window.addEventListener('resize', submit);
resize  || |   | |
time    ============>
submit  || |   | |

const throttledSubmit = throttle(submit, DELAY);
button.addEventListener('resize', throttledSubmit);
resize   || |       | |
time    ================>
submit   |          |
         |DELAY|    |DELAY|

*/
function throttle(fn, delay) {
    let isWaiting = false;

    return (...args) => {
        if (!isWaiting) {
            fn(...args);
            isWaiting = true;

            setTimeout(() => {
                isWaiting = false;
            }, delay);
        }
    };
}
