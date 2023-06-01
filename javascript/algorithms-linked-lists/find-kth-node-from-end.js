/**
LL: Find Kth Node From End ( ** Interview Question)
Implement a member function called findKthFromEnd(k) that finds and returns the kth node from the end of the linked list.

Note: this LinkedList implementation does not have a length member variable.

Output:
    Return the kth node from the end of the linked list.
    If the value of k is greater than or equal to the number of nodes in the list, return null.

Constraints:
    You are not allowed to use any additional data structures (such as arrays) or modify the existing data structure.
    You can only traverse the linked list once.


Example 1:
Suppose you have a LinkedList object, list, with the following values:
1 -> 2 -> 3 -> 4 -> 5

After calling the findKthFromEnd(2) function:
    let kthNode = list.findKthFromEnd(2);
The kthNode should have the value 4.

Example 2:
Now suppose you have a LinkedList object, list, with the following values:
1 -> 2 -> 3 -> 4 -> 5 -> 6

After calling the findKthFromEnd(4) function:
    let kthNode = list.findKthFromEnd(4);
The kthNode should have the value 3.

Example 3:
Now suppose you have a LinkedList object, list, with the following values:
1 -> 2 -> 3 -> 4 -> 5 -> 6

After calling the findKthFromEnd(7) function:
    let kthNode = list.findKthFromEnd(7);
The kthNode should have the value null.

*/
/*
I: singly linked list, and a number, larger than 0
O: node on that position starting from the end
C:
- If the value of k is greater than or equal to the number of nodes in the list, return null.
- You are not allowed to use any additional data structures (such as arrays) or modify the existing data structure.
- You can only traverse the linked list once.
- Position from the back indexed on 1

S: regular and runner pointers
runner is ahead k-1 positions
-
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

    advanceNodesAhead(n) {
        let node = this.head;
        for (let i = 0; i < n; i++) {
            if (node.next) {
                node = node.next;
            } else {
                return null;
            }
        }
        return node;
    }

    findKthFromEnd(k) {
        if (!this.head) {
            return false;
        }
        if (k === 0) {
            return this.tail;
        }

        // Initialize pointers
        let current = this.head;
        const nodesAhead = k - 1;
        let runner = this.advanceNodesAhead(nodesAhead);
        // if runner goes over, return null
        if (!runner) {
            return null;
        }

        // loop over the runner
        // whenever the runner gets to the last element, the current is the solution
        while (runner && runner.next) {
            current = current.next;
            runner = runner.next;
        }
        return current;
    }
}

let myLinkedList = new LinkedList(1);
myLinkedList.push(2);
myLinkedList.push(3);
myLinkedList.push(4);
myLinkedList.push(5);

console.log("Original list:");
myLinkedList.printList();

const k = 2;
const kthNodeFromEnd = myLinkedList.findKthFromEnd(k);

console.log(`\n${k}th node from the end:`);
if (kthNodeFromEnd) {
    console.log(kthNodeFromEnd.value);
} else {
    console.log("Not found");
}

/*
    EXPECTED OUTPUT:
    ----------------
    Original list:
    1
    2
    3
    4
    5
    2th node from the end:
    4
*/
