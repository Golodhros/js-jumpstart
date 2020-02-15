export class Stack {

    constructor(stackSize) {
        this.totalCapacity = stackSize;
        this.stack = Array(stackSize);
        this.currentSize = 0;
        this.lastIndex = 0;
    }

    push(value) {
        // check for null values or not numbers
        if (this.currentSize === this.totalCapacity) {
            throw new Error('Max capacity reached, couldn\'t push value');
        }

        this.currentSize++;
        this.stack[this.lastIndex] = value;
        this.lastIndex++;
        console.log('after push');
        console.dir(this.stack);
    }

    pop() {
        this.currentSize--;
        this.lastIndex--;
        const val = this.stack[this.lastIndex];
        this.stack[this.lastIndex] = null;

        console.log('after pop');
        console.dir(this.stack);
        return val;
    }

    peek() {
        return this.stack[this.lastIndex-1];
    }
}