// High Order Components
// functions that take at least one component as a parameter and return another component.
// Usually it adds props to the passed component after doing some work
//
// Good
// It does not have any dependency on any particular React views, and it only adds some props to a passed component.
//
// Bad
// if you use this HOC in two components being rendered on the same screen, it will fetch the data twice

const withDagobah = PlanetViewComponent =>
  class extends React.Component {
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
      return <PlanetViewComponent {...this.state} />;
    }
  };

export default withDagobah(PlanetBranch);

