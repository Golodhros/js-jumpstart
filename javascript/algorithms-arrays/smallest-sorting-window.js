/*
Given an array of integers that are out of order, determine the bounds of the smallest window that must be sorted in order for the entire array to be sorted.

Example:
I: [3, 7, 5, 6, 9]
O: (1, 3)

Example 2:
I: [1, 3, 2, 4, 6, 5, 9]
O: (1, 5)

*/
/*
I: out of order array of integers
O: bounds, zero-indexed
C:
- If ordered, result is [0, 0]
- If all 0, result is [0, 0]
- Order is ascending

S:
[3, 7, 5, 6, 9]
[3, 5, 6, 7, 9]
// Sort O(n lg n) + traverse O(n) + traverse O(n) = O(n log n)
// Traverse from left, find first non-matching number, that's lower bound
// Traverse from right, find first non-matching number, that's upper bound

*/

const ascendingComparator = (a, b) => {
    if (a < b) {
        return -1;
    }
    if (a === b) {
        return 0;
    }
    if (a > b) {
        return 1;
    }
};

const getSortingWindowBounds = (numbers) => {
    let lowerBound = 0;
    let upperBound = 0;

    // Sort numbers
    const sortedNumbers = [...numbers].sort(ascendingComparator);

    // Compare sorted and original
    // // Traverse from left, find first non-matching
    for (let i = 0; i < numbers.length; i++) {
        if (numbers[i] !== sortedNumbers[i]) {
            lowerBound = i;
            break;
        }
    }
    // // Traverse from right, find first non-matching
    for (let j = numbers.length - 1; j > 0; j--) {
        if (numbers[j] !== sortedNumbers[j]) {
            upperBound = j;
            break;
        }
    }
    // Return bounds
    return [lowerBound, upperBound];
};

console.log(getSortingWindowBounds([3, 7, 5, 6, 9]));
console.log(getSortingWindowBounds([1, 3, 2, 4, 6, 5, 9]));
console.log(getSortingWindowBounds([1, 1, 1, 1]));
console.log(getSortingWindowBounds([1, 1, 1, 2, 1]));
console.log(getSortingWindowBounds([0, 0]));
console.log(getSortingWindowBounds([0]));
console.log(getSortingWindowBounds([1]));

// I: [3, 7, 5, 6, 9];
// O: 1, 3;

const RIDICUOLUSLY_HIGH_NUMBER = 10000000;

const getSortingWindowBoundsBetter = (numbers) => {
    let lowerBound = 0;
    let upperBound = 0;
    let runningMax = -RIDICUOLUSLY_HIGH_NUMBER;
    let runningMin = RIDICUOLUSLY_HIGH_NUMBER;

    for (let i = 0; i < numbers.length; i++) {
        if (numbers[i] > runningMax) {
            runningMax = numbers[i];
        } else if (numbers[i] < runningMax) {
            upperBound = i;
        }
    }

    for (let j = numbers.length - 1; j > 0; j--) {
        if (numbers[j] < runningMin) {
            runningMin = numbers[j];
        } else if (numbers[j] > runningMin) {
            lowerBound = j;
        }
    }

    return [lowerBound, upperBound];
};

// [1, 1, 1, 2, 1])

console.log(getSortingWindowBoundsBetter([3, 7, 5, 6, 9]));
console.log(getSortingWindowBoundsBetter([1, 3, 2, 4, 6, 5, 9]));
console.log(getSortingWindowBoundsBetter([1, 1, 1, 1]));
console.log(getSortingWindowBoundsBetter([1, 1, 1, 2, 1]));
console.log(getSortingWindowBoundsBetter([0, 0]));
console.log(getSortingWindowBoundsBetter([0]));
console.log(getSortingWindowBoundsBetter([1]));
