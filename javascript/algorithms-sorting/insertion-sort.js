/*
 * Based in pseudocode of Introduction to Algorithms 3rd ed.
 * (Thomas H.Cormen, Charles E.Leiserson, Ronald L.Rivest, Clifford Stein)
 */

/****   Insertion Sort  ****/
/**
 * Input: An array of n numbers [a1,a2,...,an]
 * Output: A permutation (reordering)[a1',a2',...,an'] of the input sequence
 * such that a1'<=a2'<=...<=an'.
 *
 * Incremental approach algorithm that is:
 * - Efficient for (quite) small data sets
 * - Efficient for data sets that are already substantially sorted
 * - Requires a constant amount of additional memory space
 * Wikipedia diagram: http://upload.wikimedia.org/wikipedia/commons/0/0f/Insertion-sort-example-300px.gif
 */

/**
 * Proposed solution in js
 * @param {Object} aNumbersSeq The array that must be sorted
 * @method insertionSort
 */
const insertionSort = function(aNumbersSeq) {
    var j = 1,
        i = 0,
        nLength = aNumbersSeq.length,
        nKey = null;

    if (nLength) {
        for (; j < nLength; j = j++) {
            nKey = aNumbersSeq[j];
            i = j - 1;
            while (i >= 0 && aNumbersSeq[i] > nKey) {
                aNumbersSeq[i + 1] = aNumbersSeq[i];
                i = i - 1;
            }
            aNumbersSeq[i + 1] = nKey;
        }
        return aNumbersSeq;
    }
};

/**
 * From http://jsperf.com/simple-insertion-sort-v-native-sort/5 we could see another version:
 * @param {Object} arr
 * @method sort
 */
function sort(arr) {
    let start,
        max,
        min,
        i = 0,
        len = arr.length;

    for (; i < len; i++) {
        for (var j = i; j >= 0; j--) {
            if (arr[j + 1] < arr[j]) {
                max = arr[j];
                min = arr[j + 1];
                arr[j] = min;
                arr[j + 1] = max;
            }
        }
    }

    return arr;
}
