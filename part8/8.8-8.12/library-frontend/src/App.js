import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Notify from "./components/Notify";
import { ALL_AUTHORS, ALL_BOOKS } from "./components/queries";

const App = () => {
  const [page, setPage] = useState("authors");
  const [errorMessage, setErrorMessage] = useState(null);

  const resultAuthors = useQuery(ALL_AUTHORS);
  const resultBooks = useQuery(ALL_BOOKS);

  if (resultAuthors.loading || resultBooks.loading)
    return <div>Loading...</div>;

  const notify = (msg) => {
    setErrorMessage(msg);
    setTimeout(() => setErrorMessage(null), 3000);
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
      </div>
      <Notify errorMessage={errorMessage} />
      <Authors
        show={page === "authors"}
        authors={resultAuthors.data.allAuthors}
      />

      <Books show={page === "books"} books={resultBooks.data.allbooks} />

      <NewBook show={page === "add"} setError={notify} />
    </div>
  );
};

export default App;
