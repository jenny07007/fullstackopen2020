import React from "react";
import { connect } from "react-redux";
import { createAnecdote, setNotification } from "../actions";

const AnecdoteForm = ({ createAnecdote, setNotification }) => {
  const addAdecdote = (e) => {
    e.preventDefault();
    if (!e.target.anecdote.value) return;

    const content = e.target.anecdote.value;
    e.target.anecdote.value = "";
    createAnecdote(content);
    setNotification(`'${content}' has been added! `, 5);
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAdecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { anecdotes: state.anecdotes, notification: state.notification };
};

export default connect(mapStateToProps, { createAnecdote, setNotification })(
  AnecdoteForm
);
