// Please use this Google doc during your interview (your interviewer will see what you write here). To free your hands for typing, we recommend using a headset or speakerphone.

const C = {
    count: 1,

    getCount() {
        return this.count;
    }
};

console.log(C.getCount()); //1

var f = C.getCount;

// Your solution below:
f = f.bind(C);

console.log(f()); // undefined

// =================
// Eliseo => E[Li]seo, El[I]seo, Eli[S]eo, Eli[Se]o, Elise[O]
// ELISEO => E[Li]SEO, EL[I]SEO, ELI[S]EO, ELI[Se]O, ELISE[O]
// LILI => [Li]LI, L[I]LI, LI[Li], LIL[I]
// I => [I]

// String
// Valid string
// No whitespaces
// < 200 chars
// Chemical elements on a dictionary ChElems
// 1 or 2 characters
// Empty array for no matches

// BF
// Eliseo

const ChElems = {
    Li: "Litium",
    Se: "Selenium"
    // ...
};

const printName = (firstPart, element, secondPart) =>
    `${firstPart}[${element}]${firstPart}`;

const chemicalNames = s => {
    // Checks
    let results = [];
    let n = s.lenght;

    for (let i = 0; i < n; i++) {
        let singleChar = s[i].toUppercase();
        if (ChElems[singleChar] !== undefined) {
            let firstPart = s.substring(0, i);
            let secondPart = s.substring(i + 1);
            results.push(printName(firstPart, singleChar, firstPart));
        }

        if (i === n - 1) {
            let doubleChar = s[i].toUppercase() + s[i + 1].toLowercase();
            if (ChElems[doubleChar] !== undefined) {
                let firstPart = s.substring(0, i);
                let secondPart = s.substring(i + 2);
                results.push(printName(firstPart, doubleChar, firstPart));
            }
        }
    }

    return results;
};

// =========

// ELiseo
// ElIseo
// EliSeo

const formatOutput = list => {
    // Checks
    let ul = document.createElement("ul");
    let lis = document.createFragment();

    list.forEach(item => {
        let firstBracketIndex = s.indexOf("[");
        let secondBracketIndex = s.indexOf("]");
        let firstPart = item.substring(0, firstBracketIndex);
        let element = item.substring(firstBracketIndex + 1, secondBracketIndex);
        let secondPart = item.substring(secondBracketIndex + 1);

        let li = document.createElement("li");
        li.innerHTML = `${firstPart}<span class=”is-red”>${element}</span>${secondPart}`;
        lis.appendChild(li);
    });

    ul.appendChild(lis);
    return ul;
};
