import { VOTE, ADD_ANECDOTE, INIT_ANEC } from "../actions/type";

export default (state = [], action) => {
  switch (action.type) {
    case INIT_ANEC:
      return action.payload;
    case ADD_ANECDOTE:
      return [...state, action.payload];
    case VOTE:
      const updateAnec = action.payload;
      return state.map((a) => (a.id !== updateAnec.id ? a : updateAnec));
    default:
      return state;
  }
};
