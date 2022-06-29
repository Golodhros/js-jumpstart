// Basic Example: Counter
const counterReducer = (state, action) => {
    switch (action.type) {
        case "INCREASE":
            return { ...state, count: state.count + 1 };
        case "DECREASE":
            return { ...state, count: state.count - 1 };
        default:
            throw new Error();
    }
};

const Counter = () => {
    const [state, dispatch] = useReducer(counterReducer, { count: 0 });

    const handleIncrease = () => {
        dispatch({ type: "INCREASE" });
    };

    const handleDecrease = () => {
        dispatch({ type: "DECREASE" });
    };

    return (
        <div>
            <h1>Counter with useReducer</h1>
            <p>Count: {state.count}</p>

            <div>
                <button type="button" onClick={handleIncrease}>
                    +
                </button>
                <button type="button" onClick={handleDecrease}>
                    -
                </button>
            </div>
        </div>
    );
};

export default Counter;



// Logger example, similar to a logging middleware
// Ref: https://staleclosures.dev/from-redux-to-hooks-case-study/ and https://staleclosures.dev/building-usereducer-with-logger/
function enchanceDispatchWithLogger(dispatch) {
  return function (action) {
    console.groupCollapsed('Action Type:', action.type);
    return dispatch(action);
  }
}

function useReducerWithLogger(...args) {
  let prevState = useRef(initialState);
  const [state, dispatch] = useReducer(...args);

  const dispatchWithLogger = useMemo(() => {
    return enchanceDispatchWithLogger(dispatch);
  }, [dispatch]);

  useEffect(() => {
    if (state !== initialState) {
      console.log('Prev state: ', prevState.current);
      console.log('Next state: ', state);
      console.groupEnd();
    }
    prevState.current = state;
  }, [state]);


  return [state, dispatchWithLogger];
}

function App() {
  const [state, dispatch] = useReducerWithLogger(reducer, initialState);

  ...
}
