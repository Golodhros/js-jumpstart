// Asked on Lyft interview, March 2020
// https://codepen.io/team/lyftrecruiting/collab/3d78556668230ca7c3b4cde9f4112140
// `https://restcountries.eu/rest/v2/name/${encodeURI(q)}`

console.clear();

const MAX_RESULTS = 5;

class Recommendations {
  constructor(url) {
    this.url = url;
  }

  find(q) {
    let url = this.url + encodeURI(q);

    return window
      .fetch(url)
      .then(response => response.json())
      .then(response => {
        if (response.length) {
          return response.map(({ name }) => name);
        } else {
          return [];
        }
      });
  }
}

class Typeahead extends React.Component {
  state = {
    value: "",
    hasRecommendations: false,
    recommendations: [],
    activeRecommendation: 0,
    isLoading: false,
    needsRecommendations: true
  };

  _handleChange = e => {
    let value = e.target.value;
    this.setState({ value });
    this.props.recommendationFunction.find(value).then(recommendations => {
      if (recommendations.length) {
        this.setState({ recommendations, hasRecommendations: true });
      } else {
        this.setState({ hasRecommendations: false });
      }
    });
  };
  _handleOnKeyPress = e => {};

  render() {
    let {
      value,
      hasRecommendations,
      recommendations,
      activeRecommendation,
      isLoading,
      needsRecommendations
    } = this.state;

    return (
      <div className="container">
        <input
          type="text"
          value={value}
          onChange={this._handleChange}
          onKeyPress={this._handleOnKeyPress}
        />
        {hasRecommendations && (
          <ul>
            {recommendations.map((item, index) => {
              return (
                <li key={item}>
                  <button
                    type="button"
                    className={
                      index === activeRecommendation ? "is-active" : ""
                    }
                  >
                    {item}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
  }
}

class Hello extends React.Component {
  constructor(props) {
    super(props);
    this.recommendationFunction = new Recommendations(
      `https://restcountries.eu/rest/v2/name/`
    );
  }

  render() {
    return (
      <div>
        <h1>Typeahead</h1>
        <Typeahead
          recommendationFunction={this.recommendationFunction}
          maxResults={MAX_RESULTS}
        />
      </div>
    );
  }
}

ReactDOM.render(<Hello name="World" />, document.getElementById("container"));


// button.is-active {
//  box-shadow: 1px 2px 2px red;
// }
