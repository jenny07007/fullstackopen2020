import { getAll, create, getOne, update } from "../services/anecdotes";
import {
  VOTE,
  ADD_ANECDOTE,
  SHOW_MESSAGE,
  HIDE_MESSAGE,
  ANECDOTE_FILTER,
  INIT_ANEC,
} from "./type";

export const createAnecdote = (content) => async (dispatch) => {
  const getId = () => (100000 * Math.random()).toFixed(0);
  const res = await create({
    content,
    id: getId(),
    votes: 0,
  });

  dispatch({ type: ADD_ANECDOTE, payload: res });
};

export const initAnecdotes = () => async (dispatch) => {
  const res = await getAll();
  dispatch({ type: INIT_ANEC, payload: res });
};

export const giveAVote = (id) => async (dispatch) => {
  const oldAnec = await getOne(id);
  const updateAnec = { ...oldAnec, votes: oldAnec.votes + 1 };
  await update(updateAnec);

  dispatch({ type: VOTE, payload: updateAnec });
};

export const setNotification = (msg, time) => (dispatch) => {
  dispatch({ type: SHOW_MESSAGE, payload: msg });
  setTimeout(() => {
    dispatch({
      type: HIDE_MESSAGE,
    });
  }, time * 1000);
};

export const filterAnecdotes = (term) => {
  return { type: ANECDOTE_FILTER, payload: { term } };
};
