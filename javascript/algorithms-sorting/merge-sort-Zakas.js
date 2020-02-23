/*
 * Based in pseudocode of Introduction to Algorithms 3rd ed.
 * (Thomas H.Cormen, Charles E.Leiserson, Ronald L.Rivest, Clifford Stein)
 */

/****	Merge Sort	****/
/**
 * Input: An array of n numbers [a1,a2,...,an]
 * Output: A permutation (reordering)[a1',a2',...,an'] of the input sequence
 * such that a1'<=a2'<=...<=an'.
 *
 * Divide and Conquer approach algorithm that is:
 * - Is a stable sort, parallelizes better
 * - Is more efficient at handling slow-to-access sequential media
 * - Is often the best choice for sorting a linked list
 * Wikipedia diagram: http://upload.wikimedia.org/wikipedia/commons/c/cc/Merge-sort-example-300px.gif
 */

/**
 * Proposed solution in js
 * Completely based on Nicholas Zakas solution in
 * http://www.nczonline.net/blog/2009/01/27/speed-up-your-javascript-part-3/
 * @param {Object} aNumbersSeq The array that must be sorted
 * @method mergeSort
 */
const mergeSort = function (aNumbersSeq) {

	if (aNumbersSeq.length == 1) {
        return aNumbersSeq;
    }

	let nLength = aNumbersSeq.length,
		nMiddleIndex = Math.floor(nLength), // /2??
		aLeft = aNumbersSeq.slice(0,nMiddleIndex),
		aRight = aNumbersSeq.slice(nMiddleIndex);

	return merge(mergeSort(aLeft), mergeSort(aRight));
};

/**
 * Auxiliar method for mergeSort
 * @param {Object} aLeft Left part of the array to sort
 * @param {Object} aRight Right part of the array to sort
 * @method merge
 */
const merge = function (aLeft, aRight) {
	let aResult = [],
		nLeftLength = aLeft.length,
		nRightLength = aRight.length;

    while (nLeftLength > 0 && nRightLength > 0){
        if (aLeft[0] < aRight[0]){
            aResult.push(aLeft.shift());
        } else {
            aResult.push(aRight.shift());
        }
    }

    return aResult.concat(aLeft).concat(aRight);
};