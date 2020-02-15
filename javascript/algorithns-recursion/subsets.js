// CCI pg. 135
// Power Set
// Write a meetod to return all subsets of a set
// Examples:
// {} => {}
// {a1} => {}, {a1}
// {a1, a2} => {}, {a1}, {a2}, {a1, a2}
// {a1, a2, a3} => {}, {a1}, {a2}, {a3}, {a1, a2}, {a2, a3}, {a1, a2, a3}

const getSubSets = (set, index) => {
    let allSubsets;

    if (set.length === index) {
        allSubsets = [];
        allSubsets.push([]);
    } else {
        allSubsets = getSubSets(set, index + 1);
        let moreSubsets = [];
        let subsetAtIndex = set[index];

        allSubsets.forEach((item) => {
            let newSubset = [];
            newSubset = [...item];
            newSubset.push(subsetAtIndex);
            moreSubsets.push(newSubset);
        });

        allSubsets = [allSubsets, ...moreSubsets];
    }

    return allSubsets;
}

// Solution on page 349, This is not working yet!