// CCI pg.136
// Parens
// Implement an algorithm to print all valid (properly opened and closed)
// combinations of n pairs of parentheses
// EX: input: 3 output: ((())), (()()), (())(), ()(()), ()()()

const getParens = n => {
    if (n === null) {
        return null;
    }

    let combinations = [];
    if (n === 1) {
        combinations.push("()");

        return combinations;
    }

    let previousCombinations = getParens(n - 1);
    previousCombinations.forEach((combination) => {
        combinations.push('()' + combination);
        combinations.push('(' + combination + ')');
        combinations.push(combination + '()');
    });

    return [...new Set(combinations)];
};
