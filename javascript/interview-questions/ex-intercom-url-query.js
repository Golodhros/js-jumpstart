// Create a function
// I: URL with query parameters
// O: Dictionary with the query parameters and values
// Something that works
//
// Assumptions
// - Every time there is a key, there is a value
// - There are not repeated keys
// - All keys are strings
// - When a key has an [], is always marking that is an array

// "https://intercom.com?user=Tim&location=USA"
//   -> { user: "Tim", location: "USA" }

// "https://google.com?name=tim&page=1&friends=true"
//   -> { name: "tim", page: 1, friends: true }

// "https://facebook.com?names[]=tim&names[]=fred"
//   -> { names: ['tim', 'fred'] }

// "https://intercom.com?user[name]=Erin&user[email]=erin@erin.com&user[paid]=True"
//   -> { user: { name: "Erin", email: "erin@erin.com", paid: true } }

const formatValue = value => {
    if (value === "true" || value === "True") {
        return true;
    }
    if (value === "false" || value === "False") {
        return false;
    }

    if (!Number.isNaN(parseInt(value, 10))) {
        return parseInt(value, 10);
    }

    return value;
};

const getParameters = url => {
    // Checks
    // Non-empty, non-null, non-undefined

    let result = {};
    let indexOfQuestionMark = url.indexOf("?");

    if (indexOfQuestionMark === -1) {
        return result;
    }
    let queryParameters = url.substring(indexOfQuestionMark + 1);
    let queryParameterArray = queryParameters.split("&");

    queryParameterArray.forEach(valueKeyPair => {
        // Check for key-value
        let [key, value] = valueKeyPair.split("=");
        console.log("valueKeyPair", key);
        console.log("valueKeyPair", value);
        if (key.indexOf("[]") !== -1) {
            let cleanKey = key.split("[]")[0];

            console.log("cleanKey", cleanKey);

            if (result[cleanKey] === undefined) {
                result[cleanKey] = [formatValue(value)];
                console.log("newKey");
            } else {
                console.log("oldKey");
                result[cleanKey] = result[cleanKey].push(formatValue(value));
            }
        } else {
            result[key] = formatValue(value);
        }
    });

    return result;
};
