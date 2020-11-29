import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { EDIT_AUTHOR, ALL_AUTHORS } from "./queries";

const EditAuthor = ({ authors, setError }) => {
  const [name, setName] = useState("");
  const [setBornTo, setYear] = useState("");

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!name || !setBornTo) {
      return setError("year is empty");
    }
    editAuthor({ variables: { name, setBornTo } });
    setName("");
    setYear("");
  };

  return (
    <div>
      <h2>Set Birth Year</h2>
      <form onSubmit={onSubmit}>
        <div>
          name
          <select onChange={({ target }) => setName(target.value)}>
            {authors.map((author) => (
              <option key={author.id} value={author.name}>
                {author.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          born{" "}
          <input
            type="string"
            value={setBornTo ? setBornTo : ""}
            onChange={({ target }) => setYear(parseInt(target.value))}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default EditAuthor;
