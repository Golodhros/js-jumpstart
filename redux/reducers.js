// Initial State
// Creating a reusable initialState const can be useful for reuse or returning
// back to the initial state of the reducer. A well-defined initialState can
// also act as a psuedo schema for your reducer.

export const initialState = {  // I know exactly what my reducer will change, I also export for use in my tests
    isFetching: false,
    notes: [],
    message: 'Your notes list is empty, click to fetch them.',
    numberOfVisibleNotes: 0,
    author: null  //updated when user inputs into field
};



// https://github.com/reduxactions/redux-actions#handleactionsreducermap-defaultstate



// Reducer Composition
import { combineReducers } from 'redux';

const editor = (state, action) => { /* omitted for brevity */ };
const ui = (state, action) => { /* omitted for brevity */ };

const reducer = combineReducers({
  ui,
  editor,
});


// Patterns

// Adding elements to arrays
export const addTodo = (state = [], { type, todo }) => {
  switch (type) {
    case 'addTodoAtEnd':
      return [...state, todo];
    case 'addTodoAtBeginning':
      return [todo, ...state];
    case 'addTodoInMiddle':
      let middle = Math.floor(state.length/2);
      return [                // array is new
        ...state.slice(0, middle), // first X items unchanged
        newItem,
        ...state.slice(middle)     // last Y items unchanged
    ];

      return [todo, ...state];
    default:
      return state;
  }
};

// Removing elements from arrays
const removeFirstItem = (items) => {
    const [last, ...rest] = items;
    return rest;
}

const removeItemById = (items, id) => items.filter(item => item.id !== id);


// Changing object properties
const toggleTodo = (todo) => ({
    ...todo,
    completed: !todo.completed
  });


// Adding properties to objects
const addTodo = (todos, todo) => ({
  ...todos,
  [todo.id]: todo
});


// Removing properties from objects
export const removeTodo = (state = {}, { type, id }) => {
  switch (type) {
    case 'removeTodo':
      const {[id]: remove, ...rest} = state;
      return rest;
    default:
      return state;
  }
};

// More on: https://redux.js.org/recipes/structuringreducers/immutableupdatepatterns