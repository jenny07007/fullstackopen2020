import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { giveAVote, setNotification, hideNotification } from "../actions";

const AnecdoteList = () => {
  const anecdotes = useSelector(({ filters, anecdotes }) =>
    anecdotes.filter((a) => a.content.toLowerCase().includes(filters))
  );
  const dispatch = useDispatch();

  const handleClick = (id, msg) => {
    dispatch(giveAVote(id));
    dispatch(setNotification(`Voted on "${msg}"`));
    setTimeout(() => {
      dispatch(hideNotification());
    }, 5000);
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
              <button
                onClick={() => handleClick(anecdote.id, anecdote.content)}
              >
                vote
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default AnecdoteList;
