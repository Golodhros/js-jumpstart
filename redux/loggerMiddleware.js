const loggerMiddleware = ({ dispatch, getState }) => next => action => {
    const prevState = getState();
    const result = next(action);
    const nextState = getState();

    console.group('Dispatch', new Date());
    console.log('Prev state', prevState);
    console.log('Action', action);
    console.log('Next State', nextState);

    return result;
};


// USE
import loggerMiddleware from './path/to/our/loggerMiddleware';

const store = createStore(reducer, applyMiddleware(loggerMiddleware));
