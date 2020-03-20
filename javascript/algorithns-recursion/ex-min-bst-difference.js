// Given a Binary Search Tree (BST) with the root node root, return the
// minimum difference between the values of any two different nodes in the tree.
// Ex
// Input: root = [4,2,6,1,3,null,null]
// Output: 1
// Explanation:
// Note that root is a TreeNode object, not an array.

// The given tree [4,2,6,1,3,null,null] is represented by the following diagram:

//           4
//         /   \
//       2      6
//      / \
//     1   3

// while the minimum difference in this tree is 1, it occurs between node 1 and node 2, also between node 3 and node 2.

const inOrderTraversal = (node, values) => {
    if (node === null) {
        return;
    }
    inOrderTraversal(node.left, values);
    values.push(node.val);
    inOrderTraversal(node.right, values);
};

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
const minDiffInBST = function(root) {
    let minDiff = Number.POSITIVE_INFINITY;
    let values = [];

    inOrderTraversal(root, values);

    for (let i = 1; i < values.length; i++) {
        minDiff = Math.min(minDiff, Math.abs(values[i - 1] - values[i]));
    }

    return minDiff;
};
