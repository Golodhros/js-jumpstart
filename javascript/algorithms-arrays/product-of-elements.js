/*
Given an array of integers, return a new array such that each element at index i of the new array is the product of all the numbers in the original array except the one at i.

Example 1: if our input was [1, 2, 3, 4, 5], the expected output would be [120, 60, 40, 30, 24]
Example 2: if our input was [3, 2, 1], the expected output would be [2, 3, 6]

Example 3: if our input was [3, 0, 1], the expected output would be [0, 3, 0]

Follow up: what if we cant use division?
*/
/*
I: int[], N up to 1000
O: int[], N up to 1000
C:
- types are not integers - throw error? type error?
- empty array - false
- 0 -> 0
- non ordered arrays
- extra space? - no

S:
Brute force: Pick one, traverse and multiply => O(n^2) / O(n)

Multiply all, then divide by each one
[3, 2, 1] => [2, 3, 6]
O(n) + O(n) => O(n)/ O(n)

*/

const accummulateProducts = (acc, number) => {
    return acc * number;
};
const safeDivisionBy = (divident, divisor) => {
    // Check for zeros!
    if (divisor) {
        return divident / divisor;
    }
    return 0;
};

const productArray = (array) => {
    // Compute product of all numbers
    const totalProduct = array.reduce(accummulateProducts, 1);
    const divideByNumber = safeDivisionBy.bind(null, totalProduct);

    // Divide product by ith item
    return array.map(divideByNumber);
};

// productArray([3, 2, 1]);
// productArray([1, 2, 3, 4, 5]);
// productArray([0, 2, 1]);
// productArray([1, 1, 1]);
// productArray([0]);
// productArray([1]);
// productArray([3]);
// productArray([1, 2]);
// productArray([1, 2, 3]);

const computeLeftProduct = (acc, number) => {
    const result = acc.length ? acc[acc.length - 1] * number : number;

    return [...acc, result];
};

const computeRightProduct = (acc, number) => {
    const result = acc.length ? acc[0] * number : number;

    return [result, ...acc];
};

const productArrayNoDivision = (array) => {
    // Pre-compute left numbers
    const leftProduct = array.reduce(computeLeftProduct, []);
    console.log("leftProduct", leftProduct);
    // Pre-compute right numbers
    const rightProduct = array.reduceRight(computeRightProduct, []);
    console.log("rightProduct", rightProduct);

    // Compute product array
    return array.map((_, idx) => {
        const leftProductResult =
            leftProduct[idx - 1] !== undefined ? leftProduct[idx - 1] : 1;
        const rightProductResult =
            rightProduct[idx + 1] !== undefined ? rightProduct[idx + 1] : 1;

        return leftProductResult * rightProductResult;
    });
};

productArrayNoDivision([3, 2, 1]);
productArrayNoDivision([1, 2, 3, 4, 5]);
productArrayNoDivision([0, 2, 1]);
productArrayNoDivision([1, 1, 1]);
productArrayNoDivision([0]);
productArrayNoDivision([1]);
productArrayNoDivision([3]);
productArrayNoDivision([1, 2]);
productArrayNoDivision([1, 2, 3]);
