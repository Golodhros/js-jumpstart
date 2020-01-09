// Source: http://the-coderok.azurewebsites.net/2015/09/22/Boolean-array-vs-Bit-vector-in-JavaScript/

var bitVector = function(size){
    this.store = [size/32+1];
}

bitVector.prototype.setBit = function(bit, val){
    var index = ~~(bit / 32);
    var shift = ~~(bit % 32);
    var mask = 1 << shift;
    if (val){
            this.store[index] = this.store[index] | mask;
    } else {
            this.store[index] = this.store[index] & ~mask;
    }
}
bitVector.prototype.isSet = function(bit){
    var index = ~~(bit / 32);
    var shift = ~~(bit % 32);
    var mask = 1 << shift;
    return (this.store[index] & mask) > 0;
}

// Using it
var vector = new bitVector(totalSize);
for(var i=0; i < totalSize; i++){
        vector.setBit(i, i%2===0);
}
trueCount = 0;
for(var i = 0; i<totalSize; i++){
        if (vector.isSet(i)){
                trueCount++;
        }
}