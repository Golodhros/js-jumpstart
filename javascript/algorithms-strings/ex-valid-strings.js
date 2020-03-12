// Consider a string to be valid if all characters of the string appear the same number of times.
// It is also valid if he can remove just 1 character at 1 index in the string, and the remaining
// characters will occur the same number of times.
// Given a string s, determine if it is valid. If so, return YES, otherwise return NO.
// EX:
// I: aabbcd
// O: NO
// I: aabbccddeefghi
// O: NO
// I: abcdefghhgfedecba
// O: YES
//
// From https://www.hackerrank.com/challenges/sherlock-and-valid-string/problem?h_l=interview&playlist_slugs%5B%5D=interview-preparation-kit&playlist_slugs%5B%5D=strings

const YES = 'YES';
const NO = 'NO';

function isValid(s) {
    let hash = s.split('').reduce((acc, char) => {
        acc[char] = acc[char] || 0;
        acc[char] = acc[char] + 1;

        return acc;
    }, {});
    let values = Object.values(hash);
    let min = Math.min(...values);
    let max = Math.max(...values);

    // If there is no variation
    if(max===min) {
        return YES;
    }

    // Find most frequent
    let timesMin = 0;
    let timesMax = 0;
    for (let i = 0; i<values.length; i++) {
        if (values[i] === min) {
            timesMin++;
        } else if (values[i] === max){
            timesMax++;
        } else {
            // Having three different values is a No
            return NO;
        }
    }

    // Discard high variations
    if ((max-min > 1)) {
        // If there is big variation, but only once
        if (timesMin === 1) {
            return YES;
        }
        return NO;
    }

    if(timesMin > timesMax) {
        return timesMax > 1 ? NO : YES;
    } else {
        return timesMin > 1 ? NO : YES;
    }
}
