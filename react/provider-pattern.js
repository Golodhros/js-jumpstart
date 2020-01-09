// Provider
// you gather your data, put it in the React context object, and then
// in a HOC (or Render Prop) you access the context object and pass it as a prop to the intended components
//
//
import React from "react";
import PropTypes from "prop-types";

// IMPORTANT: we need to define childContextTypes
// to be able to access the context object in React
const contextTypes =
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

  static childContextTypes = {
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

  getChildContext() {
    return { dagobah: this.state };
  }

  render() {
    return this.props.children;
  }
}


// Another Example
// From: https://medium.freecodecamp.org/evolving-patterns-in-react-116140e5fe8f
// The top level component — called Provider — sets some values on the context.
// The child components — called Consumers — will grab those values from the context.

import React from 'react';
import { render } from 'react-dom';
import PropTypes from 'prop-types';

class MousePositionProvider extends React.Component {
  constructor( ) {
    super();
    this.state = { };
    this.onMouseMove = this.onMouseMove.bind( this );
  }

  getChildContext() {
    return {
      posX: this.state.posX,
      posY: this.state.posY
    };
  }

  componentDidMount( ) {
    window.addEventListener( "mousemove", this.onMouseMove );
  }

  onMouseMove( e ) {
    this.setState({ posX: e.clientX, posY: e.clientY });
  }

  render( ) {
    return this.props.children
  }
}

MousePositionProvider.childContextTypes = {
  posX: PropTypes.number,
  posY: PropTypes.number
};



class MousePositionConsumer extends React.Component {
  render( ) {
    return (
      <div>Your position is ( {this.context.posX},{this.context.posY} )</div>
    )
  }
}

MousePositionConsumer.contextTypes = {
  posX: PropTypes.number,
  posY: PropTypes.number
};



const App = () => (
  <MousePositionProvider>
    <div>
      <MousePositionConsumer />
      <MousePositionConsumer />
    </div>
  </MousePositionProvider>
);

render(<App />, document.getElementById('root'));