import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { giveAVote } from "../actions";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(giveAVote(id));
  };
  return (
    <div style={{ marginTop: "2em" }}>
      {anecdotes
        .sort((a, b) => b.votes > a.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div style={{ lineHeight: "2em" }}>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default AnecdoteList;
