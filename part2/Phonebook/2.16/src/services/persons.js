import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const getAll = async () => {
  try {
    const res = await axios.get(baseUrl);
    return res.data;
  } catch (e) {
    console.log(e);
  }
};

const create = async newNameObj => {
  try {
    const res = await axios.post(baseUrl, newNameObj);
    return res.data;
  } catch (e) {
    console.log(e);
  }
};

export default { getAll, create };
