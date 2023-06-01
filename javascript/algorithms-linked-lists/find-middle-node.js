/**
LL: Find Middle Node ( ** Interview Question)

Implement a member function called findMiddleNode() that finds and returns the middle node of the linked list.
Note: this LinkedList implementation does not have a length member variable.


Output:
- Return the middle node of the linked list.
- If the list has an even number of nodes, return the second middle node (the one closer to the end).


Constraints:
- You are not allowed to use any additional data structures (such as arrays) or modify the existing data structure.
- You can only traverse the linked list once.


Example 1:
Suppose you have a LinkedList object, list, with the following values:
1 -> 2 -> 3 -> 4 -> 5

After calling the findMiddleNode() function:

    let middle = list.findMiddleNode();

The middle node should have the value 3.

Example 2:
Now suppose you have a LinkedList object, list, with the following values:
1 -> 2 -> 3 -> 4 -> 5 -> 6

After calling the findMiddleNode() function:

    let middle = list.findMiddleNode();

The middle node should have the value 4.
 */

/*
I: singly linked list with integer values
O: list node
C:
- No length available
- No extra data structures
- If one element, return it?
- Do we want to implement more of the methods if necessary? or just make this one work?
- Non valid conditions would return 'false'

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
        this.tail = this.head;
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
    }

    findMiddleNode() {
        if (!this.head) {
            return null;
        }
        if (this.head.next === null) {
            return this.head;
        }

        // Declare pointers
        let current = this.head;
        let runner = this.head;
        // Loop until runner gets to the end
        // Regular pointer will be in the midle
        while (runner && runner.next) {
            current = current.next;
            runner = runner.next.next ? runner.next.next : undefined;
        }
        // Return regular pointer
        return current;
    }
    //          P     R
    // // 1->2->3->4->5
    //          P     R
    // // 1->2->3->4->5->6
}

let myLinkedList = new LinkedList(1);
myLinkedList.push(2);
myLinkedList.push(3);
myLinkedList.push(4);
myLinkedList.push(5);

console.log("Original list:");
myLinkedList.printList();

const middleNode = myLinkedList.findMiddleNode();
console.log(`\nMiddle node value: ${middleNode.value}`);

// Create a new list with an even number of elements
let myLinkedList2 = new LinkedList(1);
myLinkedList2.push(2);
myLinkedList2.push(3);
myLinkedList2.push(4);
myLinkedList2.push(5);
myLinkedList2.push(6);

console.log("\nOriginal list 2:");
myLinkedList2.printList();

const middleNode2 = myLinkedList2.findMiddleNode();
console.log(`\nMiddle node value of list 2: ${middleNode2.value}`);

/*
    EXPECTED OUTPUT:
    ----------------
    Original list:
    1
    2
    3
    4
    5
    Middle node value: 3
    Original list 2:
    1
    2
    3
    4
    5
    6
    Middle node value of list 2: 4
*/
