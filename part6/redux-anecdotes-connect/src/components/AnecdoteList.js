import React from "react";
import { connect } from "react-redux";
import { giveAVote, setNotification } from "../actions";
import Anecdote from "./Anecdote";

const AnecdoteList = ({ filteredAnces, giveAVote, setNotification }) => {
  const handleClick = (id, msg) => {
    giveAVote(id);
    setNotification(`you voted on '${msg}'`, 5);
  };

  return (
    <div style={{ marginTop: "2em" }}>
      {filteredAnces
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

const filteredAnces = ({ anecdotes, filters }) =>
  anecdotes.filter((a) => a.content.toLowerCase().includes(filters));

const mapToStateProps = (state) => {
  return {
    filteredAnces: filteredAnces(state),
  };
};

export default connect(mapToStateProps, { giveAVote, setNotification })(
  AnecdoteList
);
