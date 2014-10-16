// Array cloning method
// Ref: http://davidwalsh.name/javascript-clone-array
Array.prototype.clone = function() {
    return this.slice(0);
};