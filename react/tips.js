
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


// componentWillReceiveProps

// If you want to update the state in response to props changes, this is the method you need.
// Compare this.props with nextProps and if there is a significant change, act on it.
componentWillReceiveProps(nextProps){
    if(this.props.foo !== nextProps.foo){
        this.whenFooChanges();
    }
    if(this.props.bar !== nextProps.bar){
        this.whenBarChanges();
    }
}

// Note:
// React may call componentWillReceiveProps even if the props have not changed,
// so comparing this.props and nextProps is important.
// componentWillReceiveProps is invoked only before a mounted component receives new props