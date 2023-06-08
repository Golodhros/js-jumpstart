// Getting an absolute URL from a variable string isn't as easy as you think.
// There's the URL constructor but it can act up if you don't provide the required
// arguments (which sometimes you can't).
// Here's a suave trick for getting an absolute URL from and string input:
const getAbsoluteUrl = (function () {
    let a;

    return function (URL) {
        if (!a) {
            a = document.createElement("a");
        }
        a.href = URL;

        return a.href;
    };
})();

// Usage
getAbsoluteUrl("/something"); // https://davidwalsh.name/something
