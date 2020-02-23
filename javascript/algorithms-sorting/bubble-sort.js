// My Implementation
// I: bubbleSort([1, 3, 9, 7, 2])
// O: [ 1, 2, 3, 7, 9 ]
// Time - O(n^2); Space - O(1)

const swap = (array, origin, destiny) => {
    [array[origin], array[destiny]] = [array[destiny], array[origin]];
}

const bubbleSort = (array) => {
    let currentIndex = 0;

    while(currentIndex < array.length) {
        let item = array[currentIndex];

        for (let i = currentIndex + 1; i < array.length; i++) {
            if (array[i] < item) {
                swap(array, i, currentIndex);
            }
        }
        currentIndex ++;
    }

    return array;
}