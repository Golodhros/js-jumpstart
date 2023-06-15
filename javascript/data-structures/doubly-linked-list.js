class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
        this.prev = null;
    }
}

class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    // O(1)
    // push
    append(value) {
        const newNode = new Node(value);

        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.prev = this.tail;
            this.tail.next = newNode;
            this.tail = newNode;
        }

        return this.head;
    }

    // O(1)
    pop() {
        if (!this.head) {
            throw new Errors("Cannot remove from empty list!");
        }

        const itemToPop = this.tail;
        this.tail = itemToPop.prev;
        this.tail.next = null;
        itemToPop.prev = null;

        if (this.tail === null) {
            this.head === null;
        }

        return itemToPop;
    }

    // O(1)
    unshift(value) {
        let newNode = new Node(value);

        if (!this.head) {
            this.head = newNode;
        } else {
            this.head.prev = newNode;
            newNode.next = this.head;
            this.head = newNode;
        }

        return this.head;
    }

    // O(1)
    shift() {
        if (!this.head) {
            throw new Errors("Cannot remove from empty list!");
        }

        const itemToShift = this.head;
        this.head = itemToShift.next;
        this.head.prev = null;
        itemToShift.next = null;

        if (!this.head) {
            this.tail = null;
        }

        return itemToShift;
    }

    // O(n)
    // If we have the length, we can choose where to start, and it would be O(n/2)
    get(index) {
        if (index < 0) {
            throw new Error("index needs to be positive");
        }

        if (!this.head) {
            throw new Error("Cannot get from empty list!");
        }

        let current = this.head;
        for (let i = 0; i <= index; i++) {
            current = current.next;
        }

        return current;
    }

    // O(n)
    set(index, value) {
        if (index < 0) {
            throw new Error("index needs to be positive");
        }

        let itemToSet = this.get(index);

        if (itemToSet) {
            itemToSet.value = value;
            return true;
        }

        return false;
    }

    // O(n)
    insert(index, value) {
        if (index < 0) {
            throw new Error("index needs to be positive");
        }

        if (index === 0) {
            return this.unshift(value);
        }

        let newNode = new Node(value);

        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            let prev = this.get(index);
            let next = prev.next;
            newNode.prev = prev;
            newNode.next = next;
            prev.next = newNode;
            next.prev = newNode;
        }

        return true;
    }

    // O(n)
    remove(index) {
        if (index < 0) {
            throw new Error("index needs to be positive");
        }

        if (index === 0) {
            return this.shift();
        }

        let itemToRemove = this.get(index);
        if (itemToRemove) {
            let prev = itemToRemove.prev;
            let next = itemToRemove.next;
            prev.next = next;
            next.prev = prev;
            itemToRemove.next = null;
            itemToRemove.prev = null;
            return true;
        } else {
            return false;
        }
    }
}
