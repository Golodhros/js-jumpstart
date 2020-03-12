// Reverse a string
// I: stringtoreverse
// O: esreverotgnirts

// Solution 1: Array.prototype.reverse
const reverse1 = (string) => {
    let stringAsArray = string.split('');
    // let stringAsArray = Array.from(string);
    // let stringAsArray = [...string];

    return stringAsArray.reverse().join('');
}

// Solution 2: Using a stack
const reverse2 = (string) => {
    let stack = [];
    let stringLength = string.length;
    let reverse = '';

    for (let i = 0; i < stringLength; i++) {
        stack.push(string.charAt(i));
    }
    for (let j = 0; j < stringLength; j++) {
        reverse = reverse + stack.pop();
    }

    return reverse;
}

// Solution 3: Swap elements
const reverse3 = (string) => {
    let startPointer = 0;
    let endPointer = string.length - 1;
    let stringArray = string.split('');

    while(startPointer < endPointer) {
        if (startPointer !== endPointer) {
            [stringArray[startPointer], stringArray[endPointer]] = [stringArray[endPointer], stringArray[startPointer]];
        }
        startPointer++;
        endPointer--;
    }

    return stringArray.join('');
}

// Solution 4: Traverse from the end
const reverse4 = (string) => {
    let endPointer = string.length - 1;
    let reversedString = '';

    while (endPointer > -1) {
        reversedString = reversedString + string.charAt(endPointer);
        endPointer--;
    }
    return reversedString;
}

// Solution 5: For of loop
const reverse5 = (string) => {
    let reversedString = '';

    for(let char of string) {
        reversedString = char + reversedString;
    }

    return reversedString;
}

// Solution 6: with Array.reduce
const reverse6 = (string) => {
    return Array.from(string)
        .reduce((accum, char) => char + accum ,'');
}

// Solution 7: Recursive function
const reverse7 = (string) => {
    if (string === '') {
        return string;
    } else {
        return reverse7(string.substring(1)) + string[0];
    }
}
