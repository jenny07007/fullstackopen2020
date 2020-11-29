import React, { useState } from "react";
import EditAuthor from "./EditAuthor";
import Notify from "./Notify";

const Authors = ({ authors, show, token }) => {
  const [errorMessage, setErrorMessage] = useState(null);
  if (!show) return null;
  const notify = (msg) => {
    setErrorMessage(msg);
    setTimeout(() => setErrorMessage(null), 3000);
  };
  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th>author</th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {token && <EditAuthor authors={authors} setError={notify} />}
    </div>
  );
};

export default Authors;
