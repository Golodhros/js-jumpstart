// Render Props
//
// Good
// Explicit pass down of props
//
// Bad
// Performance?

class DagobahRP extends React.Component {
    state = { loading: true };

    componentDidMount() {
        fetch("https://swapi.co/api/planets/5")
            .then(res => res.json())
            .then(
                planet => this.setState({ loading: false, planet }),
                error => this.setState({ loading: false, error })
            );
    }

    render() {
        return this.props.render(this.state);
    }
}

// notice that a function is passed to the render prop:
export default () => (
    <DagobahRP
        render={({ loading, error, planet }) => {
            if (loading) {
                return <LoadingView />;
            } else if (planet) {
                return <PlanetView {...planet} />;
            } else {
                return <ErrorView />;
            }
        }}
    />
);

// Another Example: Fetch
// From: https://medium.freecodecamp.org/evolving-patterns-in-react-116140e5fe8f

class Fetch extends React.Component {
    constructor() {
        super();
        this.state = {
            content: ""
        };
    }
    componentDidMount() {
        this.setState({ content: this.props.loading() });
        fetch(this.props.url)
            .then(res => res.json())
            .then(
                res => this.setState({ content: this.props.done(res) }),
                res => this.setState({ content: this.props.error() })
            );
    }

    render() {
        return this.state.content;
    }
}

const App = () => (
    <Fetch
        url="https://www.booknomads.com/api/v0/isbn/9789029538237"
        loading={() => <div>Loading ... </div>}
        done={book => (
            <div>
                You asked for: {book.Authors[0].Name} - {book.Title}
            </div>
        )}
        error={() => <div>Error fetching content</div>}
    />
);

render(<App />, document.getElementById("root"));
