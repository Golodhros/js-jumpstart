// Mixed component
// Both the logic and the view are intertwined in one indivisible component
//
// Good
// It's easy, and it's self-contained. Plug a <Dagobah /> anywhere in your application, and it will fetch and render the data.
//
// Bad
// Not duplicable
// not useful when we need to reuse

export default class Dagobah extends React.Component {
    // State:
    // { loading: true }
    // { loading: false, planet: { name, climate, terrain } }
    // { loading: false, error: any }
    state = { loading: true };

    componentDidMount() {
        fetch("https://swapi.co/api/planets/5")
            .then(res => res.json())
            .then(
                planet => this.setState({ loading: false, planet }),
                error => this.setState({ loading: false, error })
            );
    }

    renderLoading() {
        return <div>Loading...</div>;
    }

    renderError() {
        return <div>I'm sorry! Please try again.</div>;
    }

    renderPlanet() {
        const { name, climate, terrain } = this.state.planet;
        return (
            <div>
                <h2>{name}</h2>
                <div>Climate: {climate}</div>
                <div>Terrain: {terrain}</div>
            </div>
        );
    }

    render() {
        if (this.state.loading) {
            return this.renderLoading();
        } else if (this.state.planet) {
            return this.renderPlanet();
        } else {
            return this.renderError();
        }
    }
}
