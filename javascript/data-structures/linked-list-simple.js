class Node {
    constructor(value, next = null) {
        this.value = value;
        this.next = next;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    printList() {
        let current = this.head;

        while (current) {
            console.log(`Value: ${current.value}`);
            current = current.next;
        }

        return this.head;
    }

    append(value) {
        const newNode = new Node(value);

        if (this.tail) {
            this.tail.next = newNode;
        }
        newNode.next = null;
        this.tail = newNode;

        return this.head;
    }

    prepend(value) {
        this.head = new Node(value, this.head);
    }

    getFirst() {
        return this.head;
    }

    get(index) {
        let current = this.head;
        let count = 0;

        while (current) {
            if (count === index) {
                return current.value;
            }
            count++;
            current = current.next;
        }

        return false;
    }

    _get(head, left) {
        if (!head) {
            return;
        }
        if (left === 0) {
            return head.value;
        }

        return this._get(head.next, left - 1);
    }

    getRecursive(index) {
        return this._get(this.head, index);
    }

    reverse() {
        let current = this.head;
        let prev = null;

        while (current) {
            const next = current.next;
            current.next = prev;
            prev = current;
            current = next;
        }
        this.head = prev;

        return this.head;
    }

    _reverse(current, prev = null) {
        if (current === null) {
            this.head = prev;
            return;
        }
        const next = current.next;
        current.next = prev;

        return this._reverse(next, current);
    }

    reverseRecursive() {
        let current = this.head;

        this._reverse(current);

        return this.head;
    }
}

const linkedList = new LinkedList();
linkedList.append(1);
linkedList.append(2);
linkedList.append(3);
linkedList.append(4);

linkedList.printList();

// console.log("get(2)", linkedList.get(2));
// console.log("getRecursive(2)", linkedList.getRecursive(2));

// linkedList.reverse();
linkedList.reverseRecursive();
linkedList.printList();
