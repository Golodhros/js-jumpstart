/**
 * A stack can be implemented with a singly linked list, using the tail as the side to push
 * to and pop from.
 * i.e. the null-terminated end is at the bottom of the stack.
 * Why? Because adding and removing an item at the start of a singly linked list are
 * both O(1) operations, but adding and removing an item at the end of a singly linked
 * list are O(1) and O(n) operations respectively - working at the start of a singly
 * linked list is therefore more efficient:
 * shift() and unshift() in a singly linked list become push() and pop() in a stack.
 * And instead of head and tail pointers from the singly linked list, we only keep
 * a top pointer for the stack.
 *
 * Ref: https://ivov.dev/notes/revisiting-data-structures-in-javascript
 */
class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

// | 1 |
// | 2 |
// |___|
class Stack {
    constructor(value) {
        const newNode = new Node(value);

        this.top = newNode;
        this.length = 1;
    }

    // O(1)
    push(value) {
        const newNode = new Node(value);

        if (!this.top) {
            this.top = newNode;
        } else {
            newNode.next = this.top;
            this.top = newNode;
        }

        this.length++;

        return this.top;
    }

    // O(1)
    pop() {
        if (!this.top) {
            throw new Errors("Cannot pop from empty stack!");
        }

        const itemToPop = this.top;
        this.top = itemToPop.next;
        itemToPop.next = null;

        this.length--;

        return itemToPop;
    }

    // O(1)
    peek() {
        if (!this.top) {
            throw new Errors("Cannot peek from empty stack!");
        } else {
            return this.top;
        }
    }
}
