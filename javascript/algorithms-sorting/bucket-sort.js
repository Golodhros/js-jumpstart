// My Implementation
// I: bucketSort([1, 3, 9, 7, 2])
// O: [ 1, 2, 3, 7, 9 ]
// Time - O(n log n); Space - O(n)

// Copied from quick-sort.js
const quickSort = array => {
    if (array.length === 0) {
        return [];
    }

    // We pick the last item as the pivot
    let pivotIndex = array.length - 1;
    let pivot = array.splice(pivotIndex)[0];

    let aLeft = [];
    let aRight = [];

    for (let i = 0; i < array.length; i++) {
        if (array[i] <= pivot) {
            aLeft.push(array[i]);
        } else {
            aRight.push(array[i]);
        }
    }

    return [...quickSort(aLeft), pivot, ...quickSort(aRight)];
};

const bucketSort = (list, bucketCount = 200) => {
    // only for numbers
    let min = Math.min(...list);  // get the min
    let buckets = [];

    // build the bucket and distribute the elements in the list
    for(let i = 0; i<list.length; i++){
        // this is a simple hash function that will make sure the basic rule of bucket sort
        let newBucketIndex = Math.floor( (list[i] - min) / bucketCount );

        buckets[newBucketIndex] = buckets[newBucketIndex] || [];
        buckets[newBucketIndex].push(list[i]);
    }

    // refill the elements into the original list
    let idx = 0;
    for(let i = 0; i<buckets.length; i++) {
        if (typeof buckets[i] !== "undefined"){
            // select those non-empty buckets
            buckets[i] = quickSort(buckets[i]);  // use any sorting algorithm would be fine

            // sort the elements in the bucket
            for(let j = 0; j<buckets[i].length; j++){
                list[idx++] = buckets[i][j]
            }
        }
    }

    return list;
}

// Reference: https://taoalpha.github.io/blog/2016/01/19/tech-archived-javascript-sorting-algorithm-radix-sort/