// npm install --save-dev @testing-library/user-event

import userEvent from "@testing-library/user-event";

// Setup
const setup = (propOverrides) => {
    const props = {
        defaultProp1: [],
        defaultProp2: true,
        ...propOverrides,
    };
    const rendered = render(<ComponentUnderTest {...props} />);
    const user = userEvent.setup();

    return { props, rendered, user };
};

// Setup with userEvent
const setup = (propOverrides?: Partial<ComponentToTestProps>) => {
    const defaultProps = aComponentToTestTestData().build();
    const props = { ...defaultProps, ...propOverrides };
    const { container } = render(<ComponentToTest {...props} />);
    const user = userEvent.setup();

    return { props, container, user };
};


// Async testing
it("should update the text", async () => {
    const { user } = setup();
    const button = screen.getByRole("button", { name: "Click Me" });
    await user.click(button);

    const text = await screen.findByText("Clicked once");
});

it("should update things with input blur", async () => {
    const { user } = setup();
    const input = screen.getByTestId(TEST_ID_INPUT);
    const content = "test content";

    await user.type(input, content);
    await user.click(document.body);
    // OR
    await user.keyboard("test content{enter}");

    await waitFor(() => {
        const actual = screen.findByText("input changed");

        expect(actual).toBeInTheDocument();
    })
});

it("should call the API", async () => {
    await waitFor(() => expect(mockAPI).toHaveBeenCalledTimes(1));
});

// Fake timers
// Fake timers using Jest
beforeEach(() => {
    jest.useFakeTimers();
});

// Running all pending timers and switching to real timers using Jest
afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
});



// Focus Testing
// ------------------
it("compares with the currently active element", () => {
    const expected = true;
    setup();
    const button = screen.getAllByTestId("month-panel-back-decrement").at(0);
    const actual = document.activeElement === button;

    expect(actual).toBe(expected);
});

it("checks the text content of the current active element", () => {
    const expected = "10";
    setup();
    const actual = document.activeElement?.textContent;

    expect(actual).toBe(expected);
});

test("uses .toHaveFocus() to check", () => {
    setup();

    const nameLabel = screen.getByText("Name");
    userEvent.click(nameLabel);

    const nameInput = screen.getByLabelText("Name");
    expect(nameInput).toHaveFocus();
});



// Selectbox testing
// ------------------
it("should correctly set the default option", () => {
    const expected = true;
    setup();
    const actual = screen.getByRole("option", {
        name: "Select a country",
    }).selected;

    expect(actual).toBe(expected);
});

it("should display the correct number of options", () => {
    const expected = 4;
    setup();
    const actual = screen.getAllByRole("option").length;

    expect(actual).toBe(expected);
});

it("should change the selected option", () => {
    const expected = true;
    setup();

    userEvent.selectOptions(
        // Find the select element, like a real user would.
        screen.getByRole("combobox"),
        // Find and select the Ireland option, like a real user would.
        screen.getByRole("option", { name: "Ireland" })
    );
    const actual = screen.getByRole("option", { name: "Ireland" }).selected;

    expect(actual).toBe(expected);
});



// Input testing
// Value is set
describe('when a prefilled value is passed', () => {
    it('should render it in the input', () => {
        const value = 'testValue';
        const expected = value;

        setup({ value });
        const actual = (screen.getByRole('textbox') as HTMLInputElement).value;

        expect(actual).toBe(expected);
    });
});

// Value changed
describe('lifetime', () => {
    describe('when value changes', () => {
        it('should call the onChange handler', async () => {
            const onChangeSpy = jest.fn();
            const value = 'testValue';
            const expected = 1;

            const { user } = setup({ onChange: onChangeSpy });
            const input = screen.getByRole('textbox');

            await user.type(input, value);
            await user.click(document.body);
            // OR
            await user.keyboard('testValue{enter}');

            await waitFor(() => {
                const actual = (onChangeSpy as jest.Mock).mock.calls.length;

                expect(actual).toBe(expected);
            });
        });

        it('calls correct dispatch when changing the duration value', async () => {
            const { user, mockedUpdate } = setup(true);

            const input = screen.getByTestId(TestIds.adjust.duration);
            await user.clear(input);
            await user.type(input, '00:10:0');
            await user.click(document.body);

            await waitFor(() => {
                expect(mockedUpdate).toHaveBeenCalledWith({ to: 600 });
            });
        });
    });
});


// Custom hooks testing
// Ref: https://react-hooks-testing-library.com/
import React, { useState, useCallback } from "react";
import { renderHook, act } from "@testing-library/react-hooks";

function useCounter() {
    const [count, setCount] = useState(0);
    const increment = useCallback(() => setCount((x) => x + 1), []);

    return { count, increment };
}

it("counter increments with react hooks testing library", () => {
    const { result } = renderHook(() => useCounter());

    expect(result.current.count).toBe(0);

    act(() => result.current.increment());

    expect(result.current.count).toBe(1);
});



// Context Provider
import React, { useContext } from "react";
import { render, screen } from "@testing-library/react";

it("displays name of current user", () => {
    render(
        <UserContext.Provider value={{ user: { fullName: "Giorno Giovanna" } }}>
            <UserFullName />
        </UserContext.Provider>
    );
    expect(screen.getByText("Giorno Giovanna")).toBeVisible();
});

const UserContext = React.createContext();

function UserFullName() {
    const { user } = useContext(UserContext);
    return <p>{user.fullName}</p>;
}



// HOCs
import React from "react";
import { render } from "@testing-library/react";

test("Adds number and gives result as a prop", function test() {
    let result;
    function WrappedComponent({ sum }) {
        result = sum;
        return null;
    }
    const ComponentWithSum = withSum(WrappedComponent, [4, 6]);
    render(<ComponentWithSum />);

    expect(result).toBe(10);
});

function withSum(WrappedComponent, numbersToSum) {
    const sum = numbersToSum.reduce((a, b) => a + b, 0);
    return () => <WrappedComponent sum={sum} />;
}



// Portals
import React, { useRef, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

it("PortalCounter starts at 0 and increments", () => {
    const modalRoot = document.createElement("div");
    modalRoot.setAttribute("id", "modal-root");
    document.body.appendChild(modalRoot);

    render(<PortalCounter />);

    expect(screen.getByTestId("counter")).toHaveTextContent("0");
    userEvent.click(screen.getByRole("button", { name: "inc" }));
    expect(screen.getByTestId("counter")).toHaveTextContent("1");

    document.body.removeChild(modalRoot);
});

function PortalCounter() {
    const el = useRef(document.createElement("div"));
    const [count, setCount] = useState(0);

    useEffect(() => {
        const modalRoot = document.getElementById("modal-root");
        const currentEl = el.current;
        modalRoot.appendChild(currentEl);
        return () => modalRoot.removeChild(currentEl);
    }, []);

    return ReactDOM.createPortal(
        <>
            <section aria-live="polite">
                count: <span data-testid="counter">{count}</span>
            </section>
            <button type="button" onClick={() => setCount((c) => c + 1)}>
                inc
            </button>
        </>,
        el.current
    );
}


// Mocking custom hooks
import { getTemplateData } from '#/modules/Templates/redux/api';

const mockedGetTemplateData = getTemplateData as jest.Mock;
jest.mock('#/modules/Templates/redux/api', () => ({
  ...jest.requireActual('#/modules/Templates/redux/api'),
  getTemplateData: jest.fn(),
}));

//...
 beforeEach(() => {
    // For a promise returning function
    mockedGetTemplateData.mockReturnValue(Promise.resolve({}));
    // For an object returning function
    mockedGetTemplateData.mockReturnValue({
      keywordTags: [],
      category: '',
      query: '',
      aspectRatio: '',
    });
    jest.clearAllMocks();
  });
