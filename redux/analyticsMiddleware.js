const track = ({type, payload}, state) => {
    // analytics tracking api logic goes here
    console.log(`Tracking [${type}]:`, payload);
};

const analyticsMiddleware = (handler) => ({ getState }) => next => action => {
    const result = next(action);

    // Intercept actions with meta analytics
    if (!action.meta || !action.meta.analytics) {
        return result;
    }

    const { type, payload } = action.meta.analytics;

    handler({ type, payload }, getState());

    return result;
};


// USE
import { applyMiddleware, createStore } from 'redux';
import analyticsMiddleware from './path/to/our/analyticsMiddleware';

const enhancer = compose(
    applyMiddleware(analyticsMiddleware(track)),
    isDev && isBrowser && window.devToolsExtension ? window.devToolsExtension() : (f) => f
);
const store = createStore(reducer, initialState, enhancer);

// Action example
export const openNote = (id, userType, tags) => ({
    type: 'app/openNote',
    payload: { id },
    meta: {
        analytics: {
            type: 'app/openNote',
            payload: {
                id,
                userType,
                tags
            }
        }
    }
});


// Alternatives
//
// https://www.npmjs.com/package/redux-reporter
// Bugsnag: https://www.npmjs.com/package/redux-bugsnag-middleware