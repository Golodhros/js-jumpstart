// My implementation
// I: selectionSort([1, 3, 9, 7, 2])
// O: [ 1, 2, 3, 7, 9 ]
// Time - O(n^2); Space - O(1)

const findSmallest = (array, minIndex) => {
    for (let i = minIndex; i < array.length; i++) {
        if (array[i] < array[minIndex]) {
            minIndex = i;
        }
    }

    return minIndex;
};

const selectionSort = (array) => {
    let currentIndex = 0;

    while (currentIndex < array.length) {
        let minIndex = findSmallest(array, currentIndex);

        if (minIndex !== currentIndex) {
            [array[currentIndex], array[minIndex]] = [
                array[minIndex],
                array[currentIndex],
            ];
        }
        currentIndex = currentIndex + 1;
    }

    return array;
};
