// Validation rules
// On input

// Requirements
// before user starts typing: blank
// < 3 chars: "too short"
// 3+ chars: "valid"
// duplicate: "duplicate"

// Rules
// 1) min length of 3 chars
// 2) no duplicates

const MIN_LENGTH = 3;
const MIN_LENGTH_ERROR_MESSAGE = "too short";
const DUPLICATE_ERROR_MESSAGE = "duplicate";
const VALID_MESSAGE = "valid";

const getValidationMessage = (state, inputEl) => {
    let message = `${VALID_MESSAGE}`;
    let currentValue = state[inputEl].val;

    if (currentValue.length === 0) {
        return "";
    }

    // Min check
    if (currentValue.length < MIN_LENGTH) {
        message = MIN_LENGTH_ERROR_MESSAGE;
    }

    // Dup check
    Object.keys(state).forEach(key => {
        if (key !== inputEl) {
            if (state[key].val === currentValue) {
                message = DUPLICATE_ERROR_MESSAGE;
            }
        }
    });

    return message;
};

class Form extends React.Component {
    state = {
        input1: { val: "" },
        input2: { val: "" },
        input3: { val: "" }
    };

    _handleInputChange = (inputEl, e) => {
        //onInputChange(e.target);
        this.setState({
            [inputEl]: { val: e.target.value }
        });
    };

    render() {
        const { input1, input2, input3 } = this.state;
        // const inputs = new Array(this.props.numInputs);
        // {inputs.map((item))}
        return (
            <form>
                <label>
                    <input
                        value={input1.val}
                        onChange={this._handleInputChange.bind(null, "input1")}
                        name="input1"
                    />
                    <span>{getValidationMessage(this.state, "input1")}</span>
                </label>

                <label>
                    <input
                        value={input2.val}
                        onChange={this._handleInputChange.bind(null, "input2")}
                        name="input2"
                    />
                    <span>{getValidationMessage(this.state, "input2")}</span>
                </label>

                <label>
                    <input
                        value={input3.val}
                        onChange={this._handleInputChange.bind(null, "input3")}
                        name="input3"
                    />
                    <span>{getValidationMessage(this.state, "input3")}</span>
                </label>
            </form>
        );
    }
}

ReactDOM.render(<Form />, document.getElementById("root"));
