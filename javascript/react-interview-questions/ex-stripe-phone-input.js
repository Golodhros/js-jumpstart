import React from "react";

// Ref: https://codepen.io/oliver-stripe/full/LjQQvX

const MAX_NUMBER_LENGTH = 10;

const isNumber = string => {
    return !Number.isNaN(parseInt(string, 10));
};
const pruneNonNumbers = string => {
    let stringArray = string.split("");

    return stringArray.filter(isNumber).join("");
};
const format = string => {
    let firstPart = string.substr(0, 3);
    let secondPart = string.substr(3, 3);
    let thirdPart = string.substr(6, 9);

    if (string.length === 0) {
        return ``;
    }
    if (string.length < 4) {
        return `(${firstPart}`;
    }
    if (string.length === 4) {
        return `(${firstPart}) ${secondPart}`;
    }
    if (string.length < 7) {
        return `(${firstPart}) ${secondPart}`;
    }

    return `(${firstPart}) ${secondPart}-${thirdPart}`;
};

export default class extends React.Component {
    state = {
        value: ""
    };

    _handleChange = e => {
        let value = pruneNonNumbers(e.target.value);

        if (value.length <= MAX_NUMBER_LENGTH) {
            this.setState({ value });
        } else {
            this.setState({ value: value.substr(0, 10) });
        }
    };

    render() {
        let { value } = this.state;

        return (
            <div>
                <input
                    style={{ width: "306px", height: "50px" }}
                    value={format(value)}
                    onChange={this._handleChange}
                />
            </div>
        );
    }
}
