import React from "react";

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div>
      <div>{anecdote.content}</div>
      <div style={{ lineHeight: "2em" }}>
        has {anecdote.votes}
        <button onClick={() => handleClick(anecdote.id, anecdote.content)}>
          vote
        </button>
      </div>
    </div>
  );
};

export default Anecdote;
