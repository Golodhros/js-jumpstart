// Source: http://the-coderok.azurewebsites.net/2015/09/22/Boolean-array-vs-Bit-vector-in-JavaScript/

class bitVector {
    constructor(size) {
        this.store = new Array[size/32+1];
    }

    setBit(bit, value) {
        const index = ~~(bit / 32); // ~~ is a faster version of Math.floor
        const shift = ~~(bit % 32);
        const mask = 1 << shift;

        if (value) {
            this.store[index] = this.store[index] | mask; // sets to 1
        } else {
            this.store[index] = this.store[index] & ~mask;
        }
    }

    isSet(bit) {
        const index = ~~(bit / 32);
        const shift = ~~(bit % 32);
        const mask = 1 << shift;

        return (this.store[index] & mask) > 0;
    }
}



// Using it
let vector = new bitVector(totalSize);

for(let i=0; i < totalSize; i++){
    vector.setBit(i, i%2===0);
}

let trueCount = 0;
for(let i = 0; i<totalSize; i++){
    if (vector.isSet(i)){
        trueCount++;
    }
}