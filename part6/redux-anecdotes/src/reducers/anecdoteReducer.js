import { VOTE, ADD_ANECDOTE } from "../actions/type";
import { getId } from "../utils";

const anecdotesAtStart = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const initialState = anecdotesAtStart.map(asObject);

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_ANECDOTE:
      return [...state, action.payload];
    case VOTE:
      const id = action.payload.id;
      const anecdoteFound = state.find((a) => a.id === id);
      const anecdoteVoted = {
        ...anecdoteFound,
        votes: anecdoteFound.votes + 1,
      };
      return state.map((a) => (a.id !== id ? a : anecdoteVoted));
    default:
      return state;
  }
};
