import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

export const getAll = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

export const getOne = async (id) => {
  const res = await axios.get(`${baseUrl}/${id}`);
  return res.data;
};

export const create = async (anecdote) => {
  const res = await axios.post(baseUrl, anecdote);
  return res.data;
};

export const update = async (anecdote) => {
  const res = axios.patch(`${baseUrl}/${anecdote.id}`, anecdote);
  return res.data;
};
