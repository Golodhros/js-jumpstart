// Provider
// you gather your data, put it in the React context object, and then
// in a HOC (or Render Prop) you access the context object and pass it as a prop to the intended components
//
//
import React from "react";
import PropTypes from "prop-types";

// IMPORTANT: we need to define childContextTypes
// to be able to access the context object in React
const contextTypes = {
  dagobah: PropTypes.shape({
    loading: PropTypes.bool,
    error: PropTypes.object,
    planet: PropTypes.shape({
      name: PropTypes.string,
      climate: PropTypes.string,
      terrain: PropTypes.string
    })
  })
};

export class DagobahProvider extends React.Component {
  state = { loading: true };

  componentDidMount() {
    fetch("https://swapi.co/api/planets/5")
      .then(res => res.json())
      .then(
        planet => this.setState({ loading: false, planet }),
        error => this.setState({ loading: false, error })
      );
  }

  static childContextTypes = contextTypes;

  getChildContext() {
    return { dagobah: this.state };
  }

  render() {
    return this.props.children;
  }
}
