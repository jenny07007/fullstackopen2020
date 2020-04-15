import { VOTE, ADD_ANECDOTE } from "./type";
import { getId } from "../utils";

export const giveAVote = (id) => {
  return { type: VOTE, payload: { id } };
};

export const createAnecdote = (content) => {
  return { type: ADD_ANECDOTE, payload: { content, id: getId(), votes: 0 } };
};
