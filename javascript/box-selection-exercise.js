// Asked on Lyft interview, March 2020
// https://codepen.io/team/lyftrecruiting/collab/4c2a4a0f33e4424b25b6859595b3a156
// https://imgur.com/a/eLeU2

console.clear();

class Hello extends React.Component {
  state = {
    selectOrigin: [],
    selectEnd: [],
    isSelecting: false
  };

  constructor(props) {
    super(props);
    this.boxes = new Array(20).fill(true);
    this.refs = this.boxes.map(box => React.createRef());
  }

  _handleMouseDown = e => {
    this.setState({
      selectOrigin: [e.clientX, e.clientY],
      isSelecting: true
    });
  };

  _handleMouseMove = e => {
    this.setState({
      selectEnd: [e.clientX, e.clientY]
    });
  };

  _handleMouseUp = e => {
    this.setState({
      isSelecting: false
    });
  };

  /**
   * @typedef {Object} Rect
   * @property {number} top
   * @property {number} left
   * @property {number} bottom
   * @property {number} right
   */

  /**
   * Determines if rect1 overlaps with rect2
   * @param {Rect} rect1
   * @param {Rect} rect2
   * @return {boolean}
   */
  overlaps = (rect1, rect2) => {
    if (rect1.right < rect2.left) return false;
    if (rect1.left > rect2.right) return false;
    if (rect1.bottom < rect2.top) return false;
    if (rect1.top > rect2.bottom) return false;

    return true;
  };

  itCollides = index => {
    console.log("el", this.refs);
  };

  render() {
    const { selectOrigin, selectEnd, isSelecting } = this.state;

    return (
      <div className="wrapper">
        <div
          className="container"
          onMouseDown={this._handleMouseDown}
          onMouseMove={this._handleMouseMove}
          onMouseUp={this._handleMouseUp}
        >
          {isSelecting ? (
            <div
              className="selector"
              style={{
                top: `${
                  selectOrigin[1] < selectEnd[1]
                    ? selectOrigin[1]
                    : selectEnd[1]
                }px`,
                left: `${
                  selectOrigin[0] < selectEnd[0]
                    ? selectOrigin[0]
                    : selectEnd[0]
                }px`,
                width: `${Math.abs(selectEnd[0] - selectOrigin[0])}px`,
                height: `${Math.abs(selectEnd[1] - selectOrigin[1])}px`
              }}
            ></div>
          ) : null}
          {this.boxes.map((item, index) => {
            return (
              <div
                className={`box ${this.itCollides(index) ? "selected" : ""}`}
                key={index}
                ref={this.refs[index]}
              ></div>
            );
          })}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Hello name="World" />, document.getElementById("container"));


// .wrapper {
//   margin: 0 auto;

// }
// .container {
//     text-align: center;
//   display: flex;
//   max-width: 500px;
//   flex-wrap: wrap;
//   position: relative;
// }
// .box {
//   width: 100px;
//   height: 100px;
//   border: 5px solid steelblue;
//   display: inline-block;
// }

// .box.selected {
//   background: #1dc7d8;
// }

// .selector {
//   border: 1px solid blue;
//   background: rgba(0,0,0,0.5);
//   position: absolute;
// }
