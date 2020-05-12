import { SIGN_IN_SUCCESS, SIGN_OUT, SIGN_IN_ERROR } from "../actions/types";

const INITIAL_STATE = {
  currentUser: {},
  error: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        error: null,
      };
    case SIGN_IN_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case SIGN_OUT:
      return {
        ...state,
        currentUser: {},
      };

    default:
      return state;
  }
};
