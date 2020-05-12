import {
  SIGN_IN_SUCCESS,
  SIGN_OUT,
  SHOW_MESSAGE,
  HIDE_MESSAGE,
  SIGN_IN_ERROR,
  CREATE_BLOG,
  SET_TOKEN,
  FETCH_BLOGS,
  LIKE_BLOG,
  REMOVE_BLOG,
} from "./types";
import { login } from "../services/login";
import { create, setToken, getAll, update, remove } from "../services/blogs";

export const signIn = (cred) => async (dispatch) => {
  try {
    const res = await login(cred);
    dispatch({ type: SIGN_IN_SUCCESS, payload: res });
  } catch (error) {
    dispatch({ type: SIGN_IN_ERROR, payload: error.message });
  }
};

export const signOut = () => {
  return { type: SIGN_OUT };
};

export const createBlog = (content) => async (dispatch) => {
  const res = await create(content);
  dispatch({ type: CREATE_BLOG, payload: res });
};

export const setAToken = (token) => async (dispatch) => {
  const newToken = setToken(token);
  dispatch({ type: SET_TOKEN, payload: newToken });
};

export const fetchBlogs = () => async (dispatch) => {
  const res = await getAll();
  dispatch({ type: FETCH_BLOGS, payload: res });
};

export const likeBlog = (id, newobj) => async (dispatch) => {
  const res = await update(id, newobj);
  dispatch({ type: LIKE_BLOG, payload: res });
};

export const deleteBlog = (id) => async (dispatch) => {
  await remove(id);
  dispatch({ type: REMOVE_BLOG, payload: id });
};

export const setNotification = (type, message, time) => (dispatch) => {
  dispatch({ type: SHOW_MESSAGE, payload: { type, message } });
  setTimeout(() => {
    dispatch({
      type: HIDE_MESSAGE,
    });
  }, time * 1000);
};
