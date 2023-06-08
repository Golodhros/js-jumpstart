// Calculate maximum subarray sum
// Given an array of numbers, find the maximum sum of any contiguous subarray of the array.
// Do it in O(n) time
//
// Example 1:
// I: [34, -50, 42, 14, -5, 86]
// O: 137, since we would take elements 42, 14, -5, and 86
//
// Example 2:
// I: [-5, -1, -8, -9]
// O: 0, since we would choose not to take any elements
//
// Follow up: *

/*
I: number[], negative, positive or zero
O: one number, positive or zero
C:
- N is in the range of...
- numbers can be negative

S:
1. Brute force/simple
O(n^3)

2. Sliding window
O(n) + O(n-1) + O(n-2) + O(n-3) + ... = O(n^2)
[34, -50, 42, 14, -5, 86]

3. Kadane's algorithm

*/

// Brute force O(n^2)
const bruteSubarraySum = (numbers) => {
    let currentMax = 0;

    for (let i = 0; i < numbers.length; i++) {
        for (let j = i; j < numbers.length; j++) {
            const arraySum = numbers
                .slice(i, j + 1)
                .reduce((acc, number) => acc + number, 0);

            currentMax = Math.max(currentMax, arraySum);
        }
    }

    return currentMax;
};
// bruteSubarraySum([34, -50, 42, 14, -5, 86]);

const subArraySum = (numbers) => {
    let maxEndingHere = 0;
    // Max subarray we've seen so far
    let maxSoFar = 0;

    for (let i = 0; i < numbers.length; i++) {
        const number = numbers[i];

        maxEndingHere = Math.max(number, maxEndingHere + number);
        maxSoFar = Math.max(maxSoFar, maxEndingHere);
    }

    return maxSoFar;
};

subArraySum([34, -50, 42, 14, -5, 86]);
