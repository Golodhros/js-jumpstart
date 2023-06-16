/**
 * In a queue we add on one side and remove from the other.
 *
 * With an array, whether we enqueue at the start and dequeue at the end,
 * or enqueue at the end and dequeue at the start, in both cases we will
 * have a combination of O(n) and O(1).
 *
 * With a singly linked list, we should enqueue from the end and dequeue from the
 * start of a the list - both O(1).
 *
 * Ref: https://ivov.dev/notes/revisiting-data-structures-in-javascript
 */

class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class Queue {
    constructor(value) {
        const newNode = new Node(value);

        this.first = newNode;
        this.last = newNode;
        this.length = 1;
    }

    enqueue(value) {
        const newNode = new Node(value);

        if (!this.first) {
            this.first = newNode;
            this.last = newNode;
        } else {
            this.last.next = newNode;
            this.last = newNode;
        }

        this.length++;

        return this;
    }

    dequeue() {
        if (!this.first) {
            throw new Errors("Cannot dequeue from empty queue!");
        }

        const itemToDequeue = this.first;
        if (this.length === 1) {
            this.last = null;
        } else {
            this.first = itemToDequeue.next;
            itemToDequeue.next = null;
        }

        this.length--;

        return itemToDequeue;
    }
}
