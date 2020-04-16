import { getId } from "../utils";
import {
  VOTE,
  ADD_ANECDOTE,
  SHOW_MESSAGE,
  HIDE_MESSAGE,
  ANECDOTE_FILTER,
} from "./type";

export const giveAVote = (id) => {
  return { type: VOTE, payload: { id } };
};

export const createAnecdote = (content) => {
  return { type: ADD_ANECDOTE, payload: { content, id: getId(), votes: 0 } };
};

export const setNotification = (msg) => {
  return { type: SHOW_MESSAGE, payload: msg };
};

export const hideNotification = () => {
  return { type: HIDE_MESSAGE };
};

export const filterAnecdotes = (term) => {
  return { type: ANECDOTE_FILTER, payload: { term } };
};
