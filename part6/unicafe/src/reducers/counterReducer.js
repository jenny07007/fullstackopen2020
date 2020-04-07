import { GOOD, OK, BAD, DO_NOTHING } from "../actions/types";

const initialState = { good: 0, ok: 0, bad: 0 };

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOOD:
      return { ...state, good: state.good + 1 };
    case OK:
      return { ...state, good: state.good + 1 };
    case BAD:
      return { ...state, bad: state.bad + 1 };
    case DO_NOTHING:
      return state;
    default:
      return state;
  }
};

export default counterReducer;
