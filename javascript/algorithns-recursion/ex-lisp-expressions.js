// From Youtube onsite, March 2020
// Given a set of expressions like these:
// (+ 1 2)
// (* 3 4)
// (* 7 (+ 3 2) (* 3 4 (+ 7 2) 8) 3) => 5*7*3*12*8*9 = 90720
// Formed by an operator (* or +) plus a series of operands
// Create a function that accepting the expression, it returns the value of it

// TODO: Fix


const internalEvaluate = (expression, index) => {
    let cleanExpression = expression.substring(index);
    let operator = cleanExpression.substring(index, 1);
    let result = operator === '+' ? 0 : 1;

    console.log('expression', expression)
    console.log('index', index)

    while (index < cleanExpression.length) {
        let character = cleanExpression.charAt(index);

        if ( character === '(') {
            let {value, charIndex} = internalEvaluate(expression.substring(index), index+1);

            if (operator === '+') {
                result = result + value;
            } else {
                result = result * value;
            }
            index = index + charIndex;
        } else if ( character === ')' ){
            index = index + 1;

            console.log(`index ${index} gives ${result}`)

            return {value: result, charIndex: index};
        } else {
            if (character !== ' ') {
                if (operator === '+') {
                    result = result + parseInt(character, 10);
                } else {
                    result = result * parseInt(character, 10);
                }
            }
            index = index + 1;
        }
    }
};

// const evaluate = (expression) => {
//     let cleanExpression = expression.substring(1, expression.length-1);
//     let operator = cleanExpression.substring(0, 1);
//     let result = operator === '+' ? 0 : 1;

//     let index = 1;
//     while (index < cleanExpression.length) {
//         let character = cleanExpression.charAt(index);

//         if ( character === '(') {
//             let {value, charIndex} = internalEvaluate(expression.substring(index, expression.length-1), index);

//             if (operator === '+') {
//                 result = result + value;
//             } else {
//                 result = result * value;
//             }
//             index = index + charIndex;
//         } else {
//             if (operator === '+') {
//                 result = result + parseInt(character, 10);
//             } else {
//                 result = result * parseInt(character, 10);
//             }
//             index = index + 1;
//         }
//     }
// }

const ev = (expression) => {
    let index = 1;
    let {value, charIndex} = internalEvaluate(expression, index);

    return value;
}
