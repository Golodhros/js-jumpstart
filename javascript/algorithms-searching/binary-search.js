// My Implementation
// I: binarySearch([1, 3, 9, 7, 2], 2)
// O: 4
// Time - O(log n); Space - O(log n)

const binarySearch = (array, value) => {
    return binarySearchRecursive(array, value);
};

const binarySearchRecursive = (
    array,
    value,
    min = 0,
    max = array.length - 1
) => {
    if (min > max) {
        return false;
    }
    let med = min + Math.floor((max - min) / 2);

    if (array[med] > value) {
        return binarySearchRecursive(array, value, min, med - 1);
    } else if (array[med] < value) {
        return binarySearchRecursive(array, value, med + 1, max);
    } else {
        return med;
    }
};

// Time - O(log n); Space - O(1)
const binarySearchIterative = (array, value) => {
    let min = 0;
    let max = array.length - 1;
    let med;

    while (min <= max) {
        med = min + Math.floor((max - min) / 2);

        if (array[med] > value) {
            max = med - 1;
        } else if (array[med] < value) {
            min = med + 1;
        } else {
            return med;
        }
    }

}
