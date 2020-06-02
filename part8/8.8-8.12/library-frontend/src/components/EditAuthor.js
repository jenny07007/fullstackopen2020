import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { EDIT_AUTHOR, ALL_AUTHORS } from "./queries";

const EditAuthor = () => {
  const [name, setName] = useState("");
  const [setBornTo, setYear] = useState("");

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const onSubmit = async (e) => {
    e.preventDefault();

    editAuthor({ variables: { name, setBornTo } });

    setName("");
    setYear("");
  };

  return (
    <div>
      <h2>Set Birth Year</h2>
      <form onSubmit={onSubmit}>
        <div>
          name{" "}
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          born{" "}
          <input
            value={setBornTo}
            onChange={({ target }) => setYear(parseInt(target.value))}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default EditAuthor;
