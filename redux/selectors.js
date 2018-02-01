// A selector is a function that selects part of the state tree. Selectors are also
// commonly used to return data that is derived from the state.

// it is not a good idea to put derived data (such as filtered state) in the Redux store.
// Using selectors to compute derived data allows for reuse across components and also allows
// Redux to store the minimal possible state


// https://github.com/reactjs/reselect