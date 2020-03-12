// You are given an unordered array consisting of consecutive integers [1, 2, 3,..., n]
// without any duplicates. You are allowed to swap any two elements. You need to find
// the minimum number of swaps required to sort the array in ascending order.
// Input:  an unordered array of integers
// Output: It must return an integer representing the minimum number of swaps to sort the array.
// Ex:
// I: [4 3 1 2]
// O: 3
// I: [2 3 4 1 5]
// O: 3
// I: [1 3 5 2 4 6 7]
// O: 3
// From HackerRank https://www.hackerrank.com/challenges/minimum-swaps-2/problem?h_l=interview&playlist_slugs%5B%5D=interview-preparation-kit&playlist_slugs%5B%5D=arrays

function minimumSwaps(arr) {
    let arrExtended = arr.map((item, index) => {
        return {
            val: item,
            originalIndex: index
        };
    });
    let sortedArray = arrExtended.sort((a, b) => a.val - b.val);
    let n = arr.length;
    let result = 0;
    let visited = new Array(n).fill(false);

    for(let i = 0; i<n; i++) {
        //visited[i]=true indicates that index i belongs to a cycle that is already counted
        //sortedArray[i].originalIndex === i denotes that the ith element was at its correct position
        if (visited[i] || sortedArray[i].originalIndex === i) {
            continue;
        }
        let cycleSize = 0;
        let j = i;

        // Count the size of the cycle
        while(!visited[j]) {
            visited[j] = true;
            j = sortedArray[j].originalIndex;
            cycleSize++;
        }
        result = result + (cycleSize - 1);
    }

    return result;
}
