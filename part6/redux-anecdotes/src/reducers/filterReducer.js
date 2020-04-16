import { ANECDOTE_FILTER } from "../actions/type";

export default (state = "", action) => {
  switch (action.type) {
    case ANECDOTE_FILTER:
      return action.payload.term.toLowerCase();
    default:
      return state;
  }
};
