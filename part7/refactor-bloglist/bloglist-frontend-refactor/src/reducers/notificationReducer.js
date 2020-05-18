import { SHOW_MESSAGE, HIDE_MESSAGE } from "../actions/types";

const initinalState = {
  type: "",
  message: "",
};

export default (state = initinalState, action) => {
  switch (action.type) {
    case SHOW_MESSAGE:
      return {
        ...state,
        type: action.payload.type,
        message: action.payload.message,
      };
    case HIDE_MESSAGE:
      return { ...state, type: "", message: "" };
    default:
      return state;
  }
};
