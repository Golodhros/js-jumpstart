// React v16
// It won't catch errors on event handlers unless we throw it within
// the context of a setState call
class MyErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false
        };
    }

    componentDidCatch(error, info) {
        // Error object
        console.log(error);
        // Stack Trace
        console.log(info);
        // Update state or trigger action
        this.setState(state => ({ ...state, hasError: true }));
        // Send error report
        sendToErrorReporting(error, info);
    }

    render() => {
        if (this.state.hasError) {
            return (<p>Sorry, something went wrong</p>);
        } else {
            return this.props.children;
        }
    }
}