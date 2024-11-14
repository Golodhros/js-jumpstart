// Asynchronous action helpers

// The startAction helper will create an action creator to dispatch the initial action.
// So when our requests starts, meta.done will be false.
export const startAction = (type) => () => ({
  type,
  meta: {
    done: false,
  },
});


// When our requests succeed, we will want to dispatch a success action.
// This action will need to have meta.done set to true in order to signal that we are
// done with our request. It will also not contain an error property.
// This way we can correctly determine that the request was a success.
export const successAction = (type) => (payload) => ({
  type,
  payload,
  meta: {
    done: true,
  },
});


// In case our requests fails for whatever reason, we need to inform our
// application about that too. meta.done is going to be set to true for this case too,
// but error will be set to true as well.
export const failureAction = (type) => (error) => ({
  type,
  payload: error,
  error: true,
  meta: {
    done: true,
  },
});


// To place them together
export const asyncAction = ({ func, start, success, failure }) => (
  (...args) => (dispatch) => {
    dispatch(start());
    return func(...args)
      .then((data) => dispatch(success(data)))
      .catch((error) => dispatch(failure(error)));
  }
);


// Using it
import api from '../utils/api';
import { startAction, successAction, failureAction, asyncAction } from './actionUtils';

const fetchNotesType = 'app/fetchNotes';
export const fetchNotesStart = startAction(fetchNotesType);
export const fetchNotesSuccess = successAction(fetchNotesType);
export const fetchNotesFailure = failureAction(fetchNotesType);
export const fetchNotes = asyncAction({
  func: () => api.notes.fetch(),
  start: fetchNotesStart,
  success: fetchNotesSuccess,
  failure: fetchNotesFailure,
});