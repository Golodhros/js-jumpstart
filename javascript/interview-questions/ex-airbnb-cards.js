const CARD_SUITS = {
  spades: "♠",
  hearts: "♥",
  clubs: "♣",
  diamonds: "♦",
};

const CARD_VALUES = [
  2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"
];

// Deck: 52
// Button:
// Five cards from the deck are render
// Button:
// Another five cards, no duplicates

const HAND_SIZE = 5;

const isRed = (suit) => {
  if (suit === 'hearts' || suit === 'diamonds') {
    return true;
  }
  return false;
}

const Card = ({suit, val}) => {
  return (
    <div className={`card__container ${isRed(suit) ? 'is-red' : '' }`}>
      <div className="card__top-mark">
              <div className="card__value">{val}</div>
              <div className="card__suit">{CARD_SUITS[suit]}</div>
      </div>
      <div className="card__bottom-mark">
              <div className="card__value">{val}</div>
              <div className="card__suit">{CARD_SUITS[suit]}</div>
      </div>
    </div>
  )
}


class Board extends React.Component {

  state = {
    deck: [],
    currentHand: [],
  }

  componentDidMount() {
    let newDeck = [];
    let suits = Object.keys(CARD_SUITS);

    for(let i = 0; i < suits.length; i++) {
      CARD_VALUES.forEach((value) => {
        newDeck.push({val: value, suit: suits[i]})
      })
    }

    this.setState({deck: _.shuffle(newDeck)})
  }

  _handleNewHand = () => {
    let {deck} = this.state;
    let hand = deck.slice(0, HAND_SIZE);
    let newDeck = deck.slice(HAND_SIZE);

    if (hand.length < HAND_SIZE) {
      newDeck = generateNewDeck(hand);
      hand = [...hand, newDeck.slice(0, HAND_SIZE - hand.length)]
    }

    this.setState({deck:newDeck, currentHand: hand})
  }

  render() {
    let {currentHand} = this.state;

    return (
      <div>
        <button onClick={this._handleNewHand}>Deal a new hand</button>
        {currentHand && (
          <div className="card__list">
            {currentHand.map(item => {
              return (
                <Card val={item.val} suit={item.suit} />
              );
            })}
          </div>
        )}
      </div>
    );
  }
}


ReactDOM.render(<Board />, document.getElementById("root"));




// CSS
// body {
//   background-color: #59A856;
// }

// .card__list {
//   display: flex;
// }
// .card__container {
//   background-color: white;
//   border: 2px solid black;
//   border-radius: 10px;
//   height: 130px;
//   width: 80px;
//   margin: 5px;
//   position: relative;
// }
// .card__container.is-red {
//   color: red;
// }
// .card__top-mark {
//   position: absolute;
//   top: 5px;
//   left: 5px;
// }
// .card__bottom-mark {
//   position: absolute;
//   bottom: 5px;
//   right: 5px;
//   transform: rotate(180deg);
// }
// .card__suit {}
// .card__value {}
