/**
 * Callback Pattern
 *
 * Functions are objects, which means that they can be passed
 * as arguments to other functions.
 *
 * Reference: Javascript Patterns by Stoyan Stefanov, pg 63
 */

// refactored findNodes() to accept a callback
const findNodes = function (callback) {
    let i = 100000;
    let nodes = [];
    let found;

    // check if callback is callable
    if (typeof callback !== "function") {
        callback = false;
    }
    while (i) {
        i -= 1;
        // complex logic here...
        // now callback:
        callback?.(found);
        nodes.push(found);
    }

    return nodes;
};

// a callback function
const hide = function (node) {
    node.style.display = "none";
};

// find the nodes and hide them as you go
findNodes(hide);
