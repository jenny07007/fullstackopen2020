import { SIGN_IN_SUCCESS, SIGN_OUT, SIGN_IN_ERROR } from "../actions/types";

const INITIAL_STATE = {
  isSignedIn: false,
  userId: null,
  username: null,
  token: null,
  error: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        isSignedIn: true,
        userId: action.payload.id,
        username: action.payload.username,
        token: action.payload.token,
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
        isSignedIn: false,
        userId: null,
        username: null,
        token: null,
        error: null,
      };

    default:
      return state;
  }
};
