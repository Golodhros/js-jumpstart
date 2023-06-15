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

    traverse(root, node) {
        // if (!root) {
        //     return;
        // }
        // // Leaf node
        // if (!root.left && !root.right) {
        //     if (root.value > node.value) {
        //         root.right = node;
        //     } else {
        //         root.left = node;
        //     }
        //     return;
        // }
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
/**
     5
   2   6
 1   3   7
*/

const BST = new BinarySearchTree();
BST.insert(5);
BST.insert(3);
BST.insert(4);
BST.insert(2);
BST.insert(6);
BST.print();

BST.contains(2);
BST.contains(7);
