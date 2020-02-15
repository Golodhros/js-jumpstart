// CCI pg.135
// Permutations without Dups
// Write a method to compute all permutations of a string of unique characters

const insertChartAt = (word, first, i) => {
    let wordArray = word.split('');

    wordArray.splice(i, 0, first);

    return wordArray.join('');
}

const getPermutations = (str) => {
    if (str === null) {
        return null;
    }
    let permutations = [];

    if (str.length === 0) {
        permutations.push('');

        return permutations;
    }

    let first = str.substr(0, 1);
    let rest = str.substr(1);
    let words = getPermutations(rest);
    words.forEach((word) => {
        for(let i = 0; i <= word.length; i++) {
            let permutation = insertChartAt(word, first, i);

            permutations.push(permutation);
        }
    });

    return permutations;
}