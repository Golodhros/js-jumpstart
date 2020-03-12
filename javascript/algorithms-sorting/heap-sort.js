// Heap sort (max heap) implementation
// Reference: https://levelup.gitconnected.com/heapsort-for-javascript-newbies-598d25477d55

/**
 * Compares three elements (a parent and two children) and makes sure that
 * they are in the correct order for a max heap.
 * @param  {number[]} arr         Array containing the heap
 * @param  {number} length        Length of the heap
 * @param  {number} parentIndex   Index of the parent node
 * @return {number[]}             Valid max heap
 */
const heapify = (arr, length, parentIndex) => {
    let largestIndex = parentIndex;
    let leftNodeIndex = parentIndex * 2 + 1;
    let rightNodeIndex = leftNodeIndex + 1;

    // Check if left node is larger than the parent
    if (leftNodeIndex < length && arr[leftNodeIndex] > arr[largestIndex]) {
        largestIndex = leftNodeIndex;
    }

    // Check if the right node is larger than the parent and the left node
    if (rightNodeIndex < length && arr[rightNodeIndex] > arr[largestIndex]) {
        largestIndex = rightNodeIndex;
    }

    if (largestIndex !== parentIndex) {
        [arr[parentIndex], arr[largestIndex]] = [arr[largestIndex], arr[parentIndex]];
        heapify(arr, length, largestIndex);
    }

    return arr;
};

const heapSort = (arr) => {
    let length = arr.length;
    let lastParentIndex = Math.floor(length/2 - 1);
    let lastNodeIndex = arr.length - 1;

    // Create the heap
    while(lastParentIndex >= 0) {
        heapify(arr, length, lastParentIndex);
        lastParentIndex--;
    }

    // Sort
    while(lastNodeIndex >= 0) {
        // Swap first with last
        [arr[0], arr[lastNodeIndex]] = [arr[lastNodeIndex], arr[0]];
        heapify(arr, lastNodeIndex, 0);
        lastNodeIndex--;
    }

    return arr;
}
