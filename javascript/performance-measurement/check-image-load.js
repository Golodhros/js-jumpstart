// On Head:
var startTime = new Date().getTime();

function doneLoading() {
    var loadtime = new Date().getTime() - startTime;
    console.log("image took " + loadtime + "ms to load");
};

// On image
// <img class="image" alt="" onload="doneLoading()" />