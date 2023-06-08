/**
LL: Reverse Between ( ** Interview Question)

Implement a member function called reverseBetween(m, n) that reverses the nodes between indexes (using 0-based indexing) m and n (inclusive) in the linked list.

Note: this linked list class does not have a tail which will make this method easier to implement.

Output:
    The function should reverse the nodes between the indexes m and n in the linked list. The reversal should be done in-place.

Constraints:
    You are not allowed to use any additional data structures (such as arrays) or modify the existing data structure.
    You can only traverse the linked list once.

Example 1:
Suppose you have a LinkedList object, list, with the following values:
1 -> 2 -> 3 -> 4 -> 5

After calling the reverseBetween(1, 3) function:
    list.reverseBetween(1, 3);

The linked list should now have the following values:
1 -> 4 -> 3 -> 2 -> 5


Example 2:
Now suppose you have a LinkedList object, list, with the following values:
1 -> 2 -> 3 -> 4 -> 5 -> 6

After calling the reverseBetween(3, 5) function:
    list.reverseBetween(3, 5);

The linked list should now have the following values:
1 -> 2 -> 3 -> 6 -> 5 -> 4

Example 3:
Now suppose you have a LinkedList object, list, with the following values:
1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7 -> 8

After calling the reverseBetween(3, 6) function:
    list.reverseBetween(3, 6);

The linked list should now have the following values:
1 -> 2 -> 3 -> 7 -> 6 -> 5 -> 4 -> 8

 */
/*
I: m, n
O: reverse the nodes between the indexes m and n in the linked list
C:
- No tail in the LL
- 0-based indexing for positions in m,n
- m<=n
- m and n are numbers
- positions are inclusive
- in-place reversal
- no other DS or modify this one
- one traversal
- singly linked list
- we have size available

S:
- current + runner pointers, difference will be n-m
- traverse m times


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

    getLength() {
        console.log("Length: " + this.length);
    }

    makeEmpty() {
        this.head = null;
        this.length = 0;
    }

    push(value) {
        const newNode = new Node(value);
        if (!this.head) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next !== null) {
                current = current.next;
            }
            current.next = newNode;
        }
        this.length++;
    }

    // Solution
    reverseBetween(m, n) {
        if (this.head === null) return;

        const dummy = new Node(0);
        dummy.next = this.head;
        let prev = dummy;

        for (let i = 0; i < m; i++) {
            prev = prev.next;
        }

        let current = prev.next;
        for (let i = 0; i < n - m; i++) {
            const temp = current.next;
            current.next = temp.next;
            temp.next = prev.next;
            prev.next = temp;
        }
        // 1 -> 2 -> 3 -> 4 -> 5
        // 1 -> 3 -> 2 -> 4 -> 5
        // prev      curr
        // 1 -> 4 -> 3 -> 2 -> 5

        this.head = dummy.next;
    }

    // Couldn't find the solution
    reverseBetweenNone(m, n) {
        if (m >= n) {
            return false;
        }
        if (n - m + 1 > this.length) {
            return false;
        }
        if (!this.head) {
            return false;
        }

        // Initialize pointers
        let positionDifference = n - m;
        let preCurrent = null;
        let current = this.head;
        let runner = this.head;
        // Advance runner
        for (let i = 0; i < positionDifference; i++) {
            runner = runner.next;
        }
        // Traverse to get to the boundaries of the range
        for (let j = 0; j < m; j++) {
            preCurrent = current;
            current = current.next;
            runner = runner.next;
        }
        // Now current is in m; preCurrent is in m-1; runner in n
        // Prepare to Swap boundaries
        let top = runner;
        let topNext = runner.next;
        let bottom = current;
        let bottomPrev = preCurrent;
        // Advance once
        preCurrent = current;
        current = current.next;
        // Reverse list
        for (let k = 0; k < positionDifference; k++) {
            // Reverse
            let tmp = current.next;
            current.next = preCurrent;
            pre = current;
            current = tmp;
        }
        // Swap boundaries
        bottom.next = topNext;
        bottomPrev.next = top;
        current.next = topNext;
        bottomPrev.next = bottom;
        // preCurrent.next = runner;
        // runner.next = current.next;
        // current.next = runnerTmp;

        // 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7 -> 8
        // to
        // 1 -> 2 -> 3 -> 4 <- 5 <- 6 <- 7 -> 8

        // 1 -> 2 -> 3 -> 7 -> 6 -> 5 -> 4 -> 8

        return this;
    }
}

let myLinkedList = new LinkedList(1);
myLinkedList.push(2);
myLinkedList.push(3);
myLinkedList.push(4);
myLinkedList.push(5);

console.log("Original list:");
myLinkedList.printList();

const m = 2;
const n = 4;
myLinkedList.reverseBetween(m, n);

console.log(`\nList after reversing between indexes of ${m} and ${n}:`);
myLinkedList.printList();

let myLinkedList2 = new LinkedList(1);
myLinkedList2.push(2);
myLinkedList2.push(3);
myLinkedList2.push(4);
myLinkedList2.push(5);

console.log("Original list:");
myLinkedList2.printList();

const m2 = 1;
const n2 = 4;
myLinkedList2.reverseBetween(m2, n2);

console.log(`\nList after reversing between indexes of ${m2} and ${n2}:`);
myLinkedList2.printList();

/*
    EXPECTED OUTPUT:
    ----------------
    Original list:
    1
    2
    3
    4
    5
    List after reversing between indexes of 2 and 4:
    1
    2
    5
    4
    3
*/
