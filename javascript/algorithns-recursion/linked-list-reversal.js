// The recursive way
// Post-order traversal
const printReversedLinkedList = (head) => {
    if (head === null) {return;}
    printReversedLinkedList(head.next);
    console.log(head.val);
}

// The iterative way
// With an stack
const printReversedLinkedListIter = (head) => {
    let stack = [];
    while(head !== null) {
        stack.push(head);
        head = head.next;
    }
    while(stack.length) {
        console.log(stack.pop().val)
    }
}
