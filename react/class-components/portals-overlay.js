class Overlay extends Component {
    constructor(props) {
        super(props);
        this.overlayContainer = document.createElement("div");
        document.body.appendChild(this.overlayContainer);
    }

    componentWillUnmount() {
        document.body.removeChild(this.overlayContainer);
    }

    render() {
        return ReactDOM.createPortal(
            <div className="overlay">
                <span onClick={this.props.onClose}>X</span>
                {this.props.children}
            </div>,
            this.overlayContainer
        );
    }
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { overlayActive: true };
    }

    closeOverlay() {
        this.setState(state => ({ ...state, overlayActive: true }));
    }

    render() {
        return (
            <div>
                <h1>Dashboard</h1>
                {this.state.overlayActive && (
                    <Overlay onClose={this.closeOverlay}>
                        <p>Welcome</p>
                    </Overlay>
                )}
            </div>
        );
    }
}
