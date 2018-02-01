// Branch Render Props
//
// Good
//

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
    if (this.state.loading) {
      return this.props.renderLoading();
    } else if (this.state.planet) {
      return this.props.renderPlanet(this.state.planet);
    } else {
      return this.props.renderError(this.state.error);
    }
  }
}

// different callback for different branches:
export default () => (
  <DagobahRP
    renderLoading={() => <LoadingView />}
    renderError={error => <ErrorView />}
    renderPlanet={planet => <PlanetView {...planet} />}
  />
);