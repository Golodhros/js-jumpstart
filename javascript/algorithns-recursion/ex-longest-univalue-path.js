// Given a binary tree, find the length of the longest path where each node in the
//  path has the same value. This path may or may not pass through the root.
// The length of path between two nodes is represented by the number of edges
// between them.
// Ex:
//     5
//    / \
//   4   5
//  / \   \
// 1   1   5
// O: 2
//
// I:
//     1
//    / \
//   4   5
//  / \   \
// 4   4   5
// O: 2
//
// Solution
let longest = 0;
const longestUnivaluePath = function(root) {
    longestUniValR(root);

    return longest;
};

function longestUniValR(node) {
    if (node === null) {
        return 0;
    }
    let left = longestUniValR(node.left);
    let right = longestUniValR(node.right);
    let arrowLeft = 0;
    let arrowRight = 0;

    if (node.left !== null && node.left.val === node.val) {
        arrowLeft = arrowLeft + left + 1;
    }
    if (node.right !== null && node.right.val === node.val) {
        arrowRight = arrowRight + right + 1;
    }
    longest = Math.max(longest, arrowLeft + arrowRight);

    return Math.max(arrowLeft, arrowRight);
}

// Complexity Analysis
// Time Complexity: O(N), where N is the number of nodes in the tree. We process every node once.
// Space Complexity: O(H), where H is the height of the tree. Our recursive call stack could be up to H layers deep.
