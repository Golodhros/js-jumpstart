// You are given a string containing characters and only.
// Your task is to change it into a string such that there are no matching
// adjacent characters. To do this, you are allowed to delete zero or more
// characters in the string.
// Ex:
// I: AAAA
// O: 3
// I: BBBBB
// O: 4
// I: ABABABAB
// O: 0
// I: AAABBB
// O: 4
function alternatingCharacters(s) {
    let result = 0;
    let n = s.length;
    let lastLetter = s[0];

    for(let i = 1; i<n; i++) {
        if (s[i] === lastLetter) {
            result++;
        } else {
            lastLetter = s[i];
        }
    }

    return result;
}

function alternatingCharactersOptimal(s) {
    let result = 0;
    let n = s.length;

    for(let i = 0; i<n; i++) {
        if (s[i] === s[i+1]) {
            result++;
        }
    }

    return result;
}

function alternatingCharactersReduce(s) {
    let count = 0;

    s.split('').reduce((acc, char) => {
        if(acc === char) {
            count++;
        }
        return char;
    });

    return count;
}
