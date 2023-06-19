// Say if a value is in the tree
// target: e
// tree:

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
            // Note: not really O(1)
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

    treeIncludesRecursive(root, value) {
        if (root === null) {
            return false;
        }
        if (root.value === value) {
            return true;
        }

        // Recurse
        return (
            this.treeIncludesRecursive(root.left, value) ||
            this.treeIncludesRecursive(root.right, value)
        );
    }

    treeIncludesBFS(root, value) {
        const queue = [root];

        while (queue.length) {
            // Note: not really O(1)
            const current = queue.shift();

            if (current.value === value) {
                console.log("found!");
                return true;
            }
            if (current.left) {
                queue.push(current.left);
            }
            if (current.right) {
                queue.push(current.right);
            }
        }

        return false;
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
BST.insert("d");
BST.insert("a");
BST.insert("c");
BST.insert("e");
BST.insert("b");
BST.insert("f");
BST.print();

// BST.DFSRecursive(BST.root, (node) => {
//     if (node.value === "e") {
//         console.log("found!");
//     }
// });

// console.log(BST.treeIncludesBFS(BST.root, "z"));
console.log(BST.treeIncludesRecursive(BST.root, "e"));
