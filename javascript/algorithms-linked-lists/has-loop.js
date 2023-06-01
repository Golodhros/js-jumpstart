/**
LL: Has Loop ( ** Interview Question)
Implement a member function called hasLoop() that checks if the linked list has a loop or not.

Output:
    Return true if the linked list has a loop.
    Return false if the linked list does not have a loop.

Constraints:
    You are not allowed to use any additional data structures (such as arrays) or modify the existing data structure.
    You can only traverse the linked list once.

Example 1:
Suppose you have a LinkedList object, list, with the following values:
1 -> 2 -> 3 -> 4 -> 5, and no loop

After calling the hasLoop() function:
    let result = list.hasLoop();
The result should be false.

Example 2:
Now suppose you have a LinkedList object, list, with the following values:
1 -> 2 -> 3 -> 4 -> 5 -> 6, and a loop exists between nodes 6 and 3

After calling the hasLoop() function:
    let result = list.hasLoop();
The result should be true.
*/

/**
I: singly linked list with or without a loop
O: boolean
C:
- Could it be one element?
- Assume it could be empty
- No extra data structures
- One traversal
- Loop can go anyhwere, not to the beginning of the list
- We don't know the size
- No extra linked lists
- Values in nodes can be repeated

S:
x Mark visited nodes


 */

class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class LinkedList {
    constructor(value) {
        const newNode = new Node(value);
        this.head = newNode;
        this.tail = newNode;
        this.length = 1;
    }

    printList() {
        let temp = this.head;
        while (temp !== null) {
            console.log(temp.value);
            temp = temp.next;
        }
    }

    getHead() {
        if (this.head === null) {
            console.log("Head: null");
        } else {
            console.log("Head: " + this.head.value);
        }
    }

    getTail() {
        if (this.tail === null) {
            console.log("Tail: null");
        } else {
            console.log("Tail: " + this.tail.value);
        }
    }

    getLength() {
        console.log("Length: " + this.length);
    }

    makeEmpty() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    push(value) {
        const newNode = new Node(value);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.length++;
    }

    hasLoop() {
        if (!this.head) return false;

        // Initialize two pointers, current and runner
        let current = this.head;
        let runner = this.head;
        // Loop with the runner
        while (runner && runner.next) {
            current = current.next;
            runner = runner.next.next;
            // If at any point, the runner is the same as the current, there is a loop
            if (runner === current) {
                return true;
            }
        }
        return false;
    }
    // 1 -> 2 -> 3 -> 4 -> 5 -> 6 ->> 3
}

let myLinkedList = new LinkedList(1);
myLinkedList.push(2);
myLinkedList.push(3);
myLinkedList.push(4);
myLinkedList.push(5);

console.log("Original list:");
myLinkedList.printList();

const hasLoopResult = myLinkedList.hasLoop();
console.log(`\nHas loop? ${hasLoopResult}`);

// Create a loop for testing purposes
myLinkedList.tail.next = myLinkedList.head.next; // Create a loop by linking tail to the second node

const hasLoopResultAfterLoop = myLinkedList.hasLoop();
console.log(`\nHas loop after creating a loop? ${hasLoopResultAfterLoop}`);

/*
    EXPECTED OUTPUT:
    ----------------
    Original list:
    1
    2
    3
    4
    5
    Has loop? false
    Has loop after creating a loop? true
*/
