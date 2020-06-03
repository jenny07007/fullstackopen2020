import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";

import { ALL_AUTHORS, ALL_BOOKS } from "./components/queries";

const App = () => {
  const [page, setPage] = useState("authors");

  const resultAuthors = useQuery(ALL_AUTHORS);
  const resultBooks = useQuery(ALL_BOOKS);

  if (resultAuthors.loading || resultBooks.loading)
    return <div>Loading...</div>;

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
      </div>

      <Authors
        show={page === "authors"}
        authors={resultAuthors.data.allAuthors}
      />

      <Books show={page === "books"} books={resultBooks.data.allbooks} />

      <NewBook show={page === "add"} />
    </div>
  );
};

export default App;
