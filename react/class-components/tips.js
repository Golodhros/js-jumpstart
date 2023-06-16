
// shouldComponentUpdate

// The default behavior of React is to re-render on every state change, and most of the time it is okay to rely on this.
// Each component has a method called shouldComponentUpdate and it is called everytime you
// change state or pass new props from the parent component.
// By default, shouldComponentUpdate returns true, but you can override it to return false for cases
// that you do not want a re-render. Here is an example:

shouldComponentUpdate(nextProps, nextState) {
    const vitalPropsChange = this.props.bar !== nextProps.bar;
    const vitalStateChange = this.state.foo !== nextState.foo;

    return vitalPropsChange || vitalStateChange;
}
// React will not re-render the component unless vitalPropsChange
// or vitalStateChange is true.
//
// Note:
// Don't run expensive computations within shouldComponentUpdate, it can be bad for performance


// functional setState

// Using an updater function when updating the state based on the previous state is a best practice:
// setState(updater, [callback])
this.setState((prevState) => {
    return {value: prevState.value + 1};
});
