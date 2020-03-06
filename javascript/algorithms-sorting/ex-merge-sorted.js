// Youu are given two sorted arrays, A and B, where A
// has a large enough buffer at the end to hold B
// Write a method to merge B into A in sorted order
// I: A [0, 2, 8, 12, 15, 20, null, null, null];
// B [1, 7, 10]
// O: [0, 1, 2, 7, 8, 10, 12, 15, 20]

// Assumptions
// - Sorted ascending
// - Number values
// - Non equal numbers
// - All legal values in both arrays
//

const mergeSortedArrays = (arrayA, arrayB) => {
    let indexB = arrayB.length - 1;
    let indexA = arrayA.length - 1 - arrayB.length;
    let indexMerged = arrayA.length - 1;

    while (indexB >= 0) {
        if (indexA >= 0 && arrayA[indexA] > arrayB[indexB]) {
            arrayA[indexMerged] = arrayA[indexA];
            indexA--;
        } else {
            arrayA[indexMerged] = arrayB[indexB];
            indexB--;
        }
        indexMerged--;
    }

    return arrayA;
}
