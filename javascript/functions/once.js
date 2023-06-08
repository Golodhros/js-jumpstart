// From https://davidwalsh.name/essential-javascript-functions
// There are times when you prefer a given functionality only happen once,
// similar to the way you'd use an onload event. This code provides you said
// functionality:
function once(fn, context) {
    let result;

    return function () {
        if (fn) {
            result = fn.apply(context || this, arguments);
            fn = null;
        }

        return result;
    };
}

// Usage
var canOnlyFireOnce = once(function () {
    console.log("Fired!");
});

canOnlyFireOnce(); // "Fired!"
canOnlyFireOnce(); // nada
