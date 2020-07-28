import React, { useState } from "react";
import { useQuery, useApolloClient } from "@apollo/client";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import Notify from "./components/Notify";

import { ALL_AUTHORS, ALL_BOOKS } from "./components/queries";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const resultAuthors = useQuery(ALL_AUTHORS);
  const resultBooks = useQuery(ALL_BOOKS);

  const client = useApolloClient();

  if (resultAuthors.loading || resultBooks.loading)
    return <div>Loading...</div>;

  const logout = () => {
    setToken(null);
    localStorage.removeItem("library-token");
    client.resetStore(); // resets the cache of the apollo client
  };

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => setErrorMessage(null), 5000);
  };

  return !token ? (
    <div>
      <Notify errorMessage={errorMessage} />
      <h2>Login</h2>
      <LoginForm setToken={setToken} setError={notify} />
    </div>
  ) : (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
        <button onClick={logout}>log out</button>
      </div>

      <Authors
        show={page === "authors"}
        authors={resultAuthors.data.allAuthors}
      />

      <Books show={page === "books"} books={resultBooks.data.allBooks} />

      <NewBook show={page === "add"} />
    </div>
  );
};

export default App;
