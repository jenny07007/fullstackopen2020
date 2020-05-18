import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;
const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

const create = async (newObj) => {
  const config = { headers: { Authorization: token } };

  const res = await axios.post(baseUrl, newObj, config);
  return res.data;
};

const update = async (id, newObj) => {
  const config = { headers: { Authorization: token } };

  const res = await axios.patch(`${baseUrl}/${id}`, newObj, config);
  return res.data;
};

const remove = async (id) => {
  const config = { headers: { Authorization: token } };

  const res = await axios.delete(`${baseUrl}/${id}`, config);
  return res.data;
};
export { getAll, create, update, setToken, remove };
