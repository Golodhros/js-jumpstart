// My Implementation
// I: quickSort([1, 3, 9, 7, 2])
// O: [ 1, 2, 3, 7, 9 ]
// Time - O(n log n); Space - O(n)

const quickSort = array => {
    if (array.length === 0) {
        return [];
    }

    // We pick the last item as the pivot
    let pivotIndex = array.length - 1;
    let pivot = array.splice(pivotIndex)[0];

    // let pivot = array[pivotIndex];
    // array = [...array.slice(0, pivotIndex), ...array.slice(pivotIndex + 1)];

    let aLeft = [];
    let aRight = [];

    for (let i = 0; i < array.length; i++) {
        if (array[i] <= pivot) {
            aLeft.push(array[i]);
        } else {
            aRight.push(array[i]);
        }
    }

    return [...quickSort(aLeft), pivot, ...quickSort(aRight)];
};
