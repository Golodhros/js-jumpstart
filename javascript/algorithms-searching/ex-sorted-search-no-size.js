// Given an array-like data structure Listy with lacks a size method.
// It does have an elementAt(i) method that returns the element at index i
// or -1 if beyond bounds. The data structure only supports positive integers
// Given a Listy sorted with positive integers, find the index at which an elment x
// occurs. If x occurs multiple times, you may return anyy index.
//
// From CCI pg150 and pg400

// Ex:
// I: [1, 2, 9, 12, 15, 18, 21, 25, 25, 45], 9
// O: 2
// I: [1, 2, 9, 12, 15, 18, 21, 25, 25, 45], 25
// O: 7 or 8

const binarySearch = (a, x, start, end) => {
    if (start>end) {
        return -1;
    }
    let middle = Math.floor((start + end)/2);

    if (a[middle] < x) {
        return binarySearch(a, x, (middle + 1), end);
    } else if (a[middle] > x) {
        return binarySearch(a, x, start, (middle - 1));
    } else {
        return middle;
    }
}
const traverse = (a, x, lastItem) => {
    let i = lastItem;

    while(a[i] !== undefined) {
        if(a[i] === x) {
            return i;
        }
        i++;
    }

    return -1;
}

const sortedSearch = (a, x) => {
    // Checks
    let lastItem = 1;
    while (a[lastItem * 2] !== undefined) { // Maybe as well && a[lastItem * 2] < x
        lastItem = lastItem * 2;
    }

    if (a[lastItem] > x) {
        return binarySearch(a, x, 0, lastItem - 1);
    } else {
        return traverse(a, x, lastItem);
    }
}
