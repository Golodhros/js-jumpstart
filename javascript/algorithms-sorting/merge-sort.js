// My implementation, recursive version
// I: mergeSort([1, 3, 9, 7, 2])
// O: [ 1, 2, 3, 7, 9 ]
// Time - O(n log n); Space - O(n) (O(n) array + O(log n) on the stack)

const partitionArray = (array) => {
    let midIndex = Math.floor(array.length/2);

    return {
        leftPartition: array.slice(0, midIndex),
        rightPartition: array.slice(midIndex),
    };
};

const merge = (aLeft, aRight) => {
    let result = [];

    while(aLeft.length && aRight.length) {
        if (aLeft[0] <= aRight[0]) {
            result.push(aLeft.shift());
        } else {
            result.push(aRight.shift());
        }
    }

    return [...result, ...aLeft, ...aRight];
};

const mergeSort = (array) => {
    if (array.length === 1) {
        return array;
    }
    let {leftPartition, rightPartition} = partitionArray(array);


    return merge(mergeSort(leftPartition), mergeSort(rightPartition));
}