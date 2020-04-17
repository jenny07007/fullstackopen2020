import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { giveAVote, setNotification } from "../actions";
import Anecdote from "./Anecdote";

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector(({ filters, anecdotes }) =>
    anecdotes.filter((a) => a.content.toLowerCase().includes(filters))
  );

  const handleClick = (id, msg) => {
    dispatch(giveAVote(id));
    dispatch(setNotification(`you voted on '${msg}'`, 5));
  };

  return (
    <div style={{ marginTop: "2em" }}>
      {anecdotes
        .sort((a, b) => b.votes > a.votes)
        .map((anecdote) => (
          <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            handleClick={handleClick}
          />
        ))}
    </div>
  );
};

export default AnecdoteList;
