// Ref: https://ivov.dev/notes/revisiting-data-structures-in-javascript

class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null;
    }

    insert(value) {
        const newNode = new Node(value);

        if (this.root === null) {
            this.root = newNode;

            return this;
        }

        let current = this.root;

        while (true) {
            if (current.value === newNode.value) {
                throw new Error("Duplicated values are not allowed on BST!");
                // Could be worked around by adding a count field in the node
            }

            if (newNode.value < current.value) {
                if (current.left === null) {
                    current.left = newNode;

                    return this;
                }
                // Go left
                current = current.left;
            } else {
                if (current.right === null) {
                    current.right = newNode;

                    return this;
                }
                // Go right
                current = current.right;
            }
        }
    }

    DFSTraversal(root, fn) {
        if (!this.root) {
            throw new Error("Can't traverse an empty BST!");
        }

        let stack = [root];

        while (stack.length) {
            const current = stack.pop();
            // Visit the node
            fn(current);

            // Careful, this order matters
            if (current.right) {
                stack.push(current.right);
            }
            if (current.left) {
                stack.push(current.left);
            }
        }

        return this;
    }

    DFSRecursive(root, fn) {
        if (root === null) {
            return;
        }
        // Process node
        fn(root);

        // Recurse
        this.DFSRecursive(root.left, fn);
        this.DFSRecursive(root.right, fn);
    }

    BFSTraversal(root, fn) {
        const queue = [root];

        while (queue.length) {
            const current = queue.shift();

            fn(current);
            if (current.left) {
                queue.push(current.left);
            }
            if (current.right) {
                queue.push(current.right);
            }
        }

        return this;
    }

    contains(value) {
        if (!this.root) {
            return false;
        }

        let current = this.root;

        while (current) {
            if (value < current.value) {
                current = current.left;
            } else if (value > current.value) {
                current = current.right;
            } else {
                return true;
            }
        }

        return false;
    }

    print() {
        console.dir(this.root);
    }
}

const BST = new BinarySearchTree();
BST.insert(5);
BST.insert(3);
BST.insert(1);
BST.insert(2);
BST.insert(6);
BST.insert(7);
BST.print();

/**
     5
    / \
   2   6
  / \   \
 1   3   7
*/

BST.contains(2);
BST.contains(7);

// console.log("DFSTraversal");
// BST.DFSTraversal(BST.root, (node) => {
//     console.log("Value", node.value);
// });

// console.log("DFSRecursive");
// BST.DFSRecursive(BST.root, (node) => {
//     console.log("Value", node.value);
// });

console.log("BFSTraversal");
BST.BFSTraversal(BST.root, (node) => {
    console.log("Value", node.value);
});
