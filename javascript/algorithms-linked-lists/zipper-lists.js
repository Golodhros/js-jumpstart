// Have two linked lists
// Merge them by making the resulting list a combination of the lists until one is over, then the rest of the other will go
// Example:
// List1: 1 -> 2 -> 3
// List2: 9 -> 8 -> 7- > 6
// Result: 1 -> 9 -> 2 -> 8 -> 3 -> 7- > 6

class Node {
    constructor(value, next = null) {
        this.value = value;
        this.next = next;
    }
}

class LinkedList {
    constructor(value) {
        if (value) {
            const initialNode = new Node(value);

            this.head = initialNode;
            this.tail = initialNode;
        }
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

        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.next = newNode;
            newNode.next = null;
            this.tail = newNode;
        }

        return this.head;
    }
}

const linkedList1 = new LinkedList(1);
linkedList1.append(2);
linkedList1.append(3);

const linkedList2 = new LinkedList(9);
linkedList2.append(8);
linkedList2.append(7);
linkedList2.append(6);

const zipperList = (list1, list2) => {
    let current1 = list1.head;
    let current2 = list2.head;
    let count = 0;
    let resultList = new LinkedList();

    // Iterate on both lists
    while (current1 && current2) {
        if (count % 2) {
            // Odd
            resultList.append(current2.value);
            current2 = current2.next;
        } else {
            // Even
            resultList.append(current1.value);
            current1 = current1.next;
        }
        count++;
    }
    // attach whatever list is still there
    if (current1) {
        resultList.tail.next = current1;
    }
    if (current2) {
        resultList.tail.next = current2;
    }

    return resultList;
};

const zipperListNoNew = (list1, list2) => {
    let tail = list1.head;
    let current1 = list1.head.next;
    let current2 = list2.head;
    let count = 0;

    while (current1 && current2) {
        if (count % 2) {
            // Odd
            tail.next = current1;
            current1 = current1.next;
        } else {
            // Even
            tail.next = current2;
            current2 = current2.next;
        }
        tail = tail.next;
        count = count + 1;
    }
    if (current1) {
        tail.next = current1;
    }
    if (current2) {
        tail.next = current2;
    }

    return list1.head;
};

const _zipper = (head1, head2) => {
    if (head1 === null && head2 === null) {
        return;
    }
    if (head1 === null) {
        return head2;
    }
    if (head2 === null) {
        return head1;
    }

    const next1 = head1.next;
    const next2 = head2.next;
    head1.next = head2;
    head2.next = _zipper(next1, next2);

    return head1;
};

const zipperListNoNewRecursive = (list1, list2) => {
    return _zipper(list1.head, list2.head);
};

// const result = zipperList(linkedList1, linkedList2).printList();
// const resultNoNew = zipperListNoNew(linkedList1, linkedList2);
const resultNoNew = zipperListNoNewRecursive(linkedList1, linkedList2);
console.log(resultNoNew);
