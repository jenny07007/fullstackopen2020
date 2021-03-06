import React from "react";
import { useDispatch } from "react-redux";
import { createAnecdote, setNotification } from "../actions";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAdecdote = (e) => {
    e.preventDefault();
    if (!e.target.anecdote.value) return;

    const content = e.target.anecdote.value;
    e.target.anecdote.value = "";
    dispatch(createAnecdote(content));
    dispatch(setNotification(`'${content}' has been added! `, 5));
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

export default AnecdoteForm;
