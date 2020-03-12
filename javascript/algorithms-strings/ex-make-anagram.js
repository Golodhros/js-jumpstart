// Given two strings, and , that may or may not be of the same length,
// determine the minimum number of character deletions required to make and anagrams.
// Any characters can be deleted from either of the strings.
// I: a, b strings
// O: number
//
// Ex:
// I: cde, abc
// O: 4
// I: fcrxzwscanmligyxyvym, jxwtrhvujlmrpdoqbisbwhmgpmeoke
// O: 30
// I: showman, woman
// O: 2

function makeAnagram(a, b) {
    let aArray = a.split('');
    let bArray = b.split('');
    let nB = b.length;
    let result = 0;

    let hashA = aArray.reduce((hash, char) => {
        hash[char] = hash[char] || 0;
        hash[char]++;

        return hash;
    }, {});

    for(let i =0; i<nB; i++) {
        let char = bArray[i];

        if(hashA[char] > 0) {
            hashA[char]--;
        } else if (hashA[char] === 0) {
            result++;
        } else if (hashA[char] === undefined) {
            result++;
        }
    }

    let aCharsLeft = Object.keys(hashA).reduce((acc, key) => {
        return acc + hashA[key];
    }, 0);

    return result + aCharsLeft;
}
