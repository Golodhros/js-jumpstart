/**
 * In a stack, we add and remove from the same side - it can be any side,
 * but ideally from the end that is most efficient to push to and pop from,
 * namely the end in a JavaScript array,
 * since shifting and unshifting require re-indexing.
 * Pushing and popping are terms shared by the stack and the array.
 */
export class MinStack {
    constructor(stackSize) {
        this.totalCapacity = stackSize;
        this.stack = Array(stackSize);
        this.currentSize = 0;
        this.lastIndex = 0;
        this.currentMin = null;
    }

    push(value) {
        // check for null values or not numbers
        if (this.currentSize === this.totalCapacity) {
            throw new Error("Max capacity reached, couldn't push value");
        }

        if (this.currentMin) {
            this.currentMin = value < this.currentMin ? value : this.currentMin;
        } else {
            this.currentMin = value;
        }
        this.currentSize++;
        this.stack[this.lastIndex] = {
            val: value,
            min: this.currentMin,
        };
        this.lastIndex++;
        console.log("after push");
        console.dir(this.stack);
    }

    pop() {
        this.currentSize--;
        this.lastIndex--;
        const { val, min } = this.stack[this.lastIndex];
        this.stack[this.lastIndex] = null;
        this.currentMin =
            this.currentMin === min
                ? this.stack[this.lastIndex - 1].min
                : this.currentMin;

        console.log("after pop");
        console.dir(this.stack);
        return val;
    }

    min() {
        return this.currentMin;
    }
}
