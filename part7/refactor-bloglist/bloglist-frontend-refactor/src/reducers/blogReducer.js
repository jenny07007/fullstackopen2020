import {
  CREATE_BLOG,
  SET_TOKEN,
  FETCH_BLOGS,
  LIKE_BLOG,
  REMOVE_BLOG,
} from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_BLOGS:
      return action.payload;
    case CREATE_BLOG:
      return [...state, action.payload];
    case SET_TOKEN:
      return action.payload || null;
    case LIKE_BLOG:
      const liked = action.payload;
      return state.map((b) => (b.id !== liked.id ? b : liked));
    case REMOVE_BLOG:
      const id = action.payload;
      return state.filter((b) => b.id !== id);
    default:
      return state;
  }
};
