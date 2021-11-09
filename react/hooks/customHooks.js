// Testing

// Example Hook
/* useFormField.js */
import React from "react";

function useFormField(initialVal = "") {
    const [val, setVal] = React.useState(initialVal);
    const [isValid, setValid] = React.useState(true);

    function onChange(e) {
        setVal(e.target.value);

        if (!e.target.value) {
            setValid(false);
        } else if (!isValid) setValid(true);
    }

    return [val, onChange, isValid];
}

export default useFormField;

// Wrapper component to render and test our hooks
function HookWrapper(props) {
    const hook = props.hook ? props.hook() : undefined;

    return <div hook={hook} />;
}

it("should set init value", () => {
    let wrapper = shallow(<HookWrapper hook={() => useFormField("")} />);

    let { hook } = wrapper.find("div").props();
    let [val, onChange, isValid] = hook;

    expect(val).toEqual("");

    wrapper = shallow(<HookWrapper hook={() => useFormField("marco")} />);

    ({ hook } = wrapper.find("div").props());
    [val, onChange, isValid] = hook;

    expect(val).toEqual("marco");
});

it("should set the right val value", () => {
    let wrapper = shallow(<HookWrapper hook={() => useFormField("marco")} />);

    let { hook } = wrapper.find("div").props();
    let [val, onChange, isValid] = hook;

    expect(val).toEqual("marco");

    onChange({ target: { value: "polo" } });

    ({ hook } = wrapper.find("div").props());
    [val, onChange, isValid] = hook;
    expect(val).toEqual("polo");
});

it("should set the right isValid value", () => {
    let wrapper = shallow(<HookWrapper hook={() => useFormField("marco")} />);

    let { hook } = wrapper.find("div").props();
    let [val, onChange, isValid] = hook;
    expect(val).toEqual("marco");
    expect(isValid).toEqual(true);

    onChange({ target: { value: "polo" } });

    ({ hook } = wrapper.find("div").props());
    [val, onChange, isValid] = hook;
    expect(val).toEqual("polo");
    expect(isValid).toEqual(true);

    onChange({ target: { value: "" } });

    ({ hook } = wrapper.find("div").props());
    [val, onChange, isValid] = hook;
    expect(val).toEqual("");
    expect(isValid).toEqual(false);
});

// Another way
export const setupReactHook = (inputOverrides) => {
    // @ts-ignore
    const Component: React.FC = ({ children }) =>
        children(HOOKNAME(...inputOverrides));
    const hook: Record<string, any> = {};
    let wrapper;

    act(() => {
        wrapper = mount(
            <Component>
                {(values) => {
                    // {(value: number) => {
                    Object.assign(hook, values);
                    // Object.assign(hook, { value });

                    return null;
                }}
            </Component>
        );
    });

    return { wrapper, hook };
};
