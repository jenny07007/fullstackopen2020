import { SHOW_MESSAGE, HIDE_MESSAGE } from "../actions/type";

export default (state = "", action) => {
  switch (action.type) {
    case SHOW_MESSAGE:
      return action.payload;
    case HIDE_MESSAGE:
      return "";
    default:
      return state;
  }
};
