export const createSharedState = (initialState) => {
    let state = initialState;

    let handlers = [];

    const getState = () => state;

    const setState = (newState) => {
        state = newState;
        handlers.forEach((handler) => handler(state));
    };

    const onChange = (handler) => {
        handlers.push(handler);

        return () => {
            handlers = handlers.filter((h) => h !== handler);
        };
    };

    return { getState, setState, onChange };
};
