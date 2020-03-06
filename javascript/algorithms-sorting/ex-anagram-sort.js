// Write a method to sort an array of strings so that
// all the anagrams are next to each other
// I: ['god', 'mod', 'rip', 'pir', 'dog']
// O: ['god', 'dog', 'rip', 'pir', 'mod'] (or similar)
//
// Assumptions
// - all valid strings
// - no other ordering apart from the grouping of anagrams
// - no dups
//

const buildStringHash = (hashMap, string) => {
    let sortedString = string.split('').sort().join('');

    if (hashMap[sortedString]) {
        hashMap[sortedString].push(string);
    } else {
        hashMap[sortedString] = [string];
    }

    // Or
    // hashMap[sortedString] = hashMap[sortedString] || [];
    // hashMap[sortedString].push(string);
}

const sortAnagrams = (stringArray) => {
    let hashMap = {};
    let result = [];

    stringArray.forEach(buildStringHash.bind(null, hashMap));

    Object.keys(hashMap).forEach((item) => {
        result.push(...hashMap[item]);
    });

    return result;
}
