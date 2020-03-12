// A left rotation operation on an array shifts each of the array's elements unit to the left.
// For example, if left rotations are performed on array [1, 2, 3, 4, 5], then the array would become [5, 1, 2, 3, 4]
// From HackerRank https://www.hackerrank.com/challenges/ctci-array-left-rotation/problem?h_l=interview&playlist_slugs%5B%5D=interview-preparation-kit&playlist_slugs%5B%5D=arrays&h_r=next-challenge&h_v=zen

function rotateRecursive(a, d) {
    if (d === 0) {
        return a;
    }
    let [head, ...rest] = a;

    return rotateRecursive([...rest, head], d - 1);
}
function rotateSpreading(a, d) {
    while (d > 0) {
        let [head, ...rest] = a;
        a = [...rest, head];
        d--;
    }
    return a;
}

// Best option
function rotLeft(a, d) {
    let moveBackArray = a.slice(0, d);
    let keepArray = a.slice(d);

    return [...keepArray, ...moveBackArray];
}
