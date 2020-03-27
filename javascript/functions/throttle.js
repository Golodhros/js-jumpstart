// Better for window's resize events
function throttle(callback, limit) {
    let wait = false;

    return (...args) => {
        if (!wait) {
            callback.apply(null, args);
            wait = true;
            setTimeout(() => {
                wait = false;
            }, limit);
        }
    };
}
