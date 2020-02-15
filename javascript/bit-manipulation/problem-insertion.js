
// You are given two 32-bit nuumbers, N and M, and two bit positions, i and j.
// Write a method to insert M into N such that M starts at bit j and ends at bit i.
// You can assume that the bits j through i have enough space to fit all of M. That is,
// if M = 10011, you can assume that there are at least 5 bits between j and i.
// You would not, for example, have j = 3 and i = 2, because M could not fully fit.

// Example:
// I: N = 10000000000, M = 10011, i = 2, j = 6
// O: N = 10001001100

// Reference: CCI pg 276

const getOnes = (i, j) => new Array(j-i+1).fill(1).join('');

const insertion = (N, M, i, j) => {
    let binaryN = parseInt(N, 2);
    let binaryM = parseInt(M, 2);
    const resetMask = parseInt(getOnes(i,j), 2) << i;
    const MMask = binaryM << i;
    const resettedN = binaryN & ~resetMask;

    return (resettedN | MMask).toString(2);
}

insertion(10000000000, 10011, 2, 6)
// '10001001100'

insertion(1111111111, 1101, 0, 3)
// '1111111101'