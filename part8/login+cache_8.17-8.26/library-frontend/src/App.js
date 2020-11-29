import React, { useState } from "react";
import { useQuery, useApolloClient, useSubscription } from "@apollo/client";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import Recommend from "./components/Recommend";
import Notify from "./components/Notify";

import { ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED } from "./components/queries";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(localStorage.getItem("library-token"));
  const [errorMessage, setErrorMessage] = useState(null);

  const resultAuthors = useQuery(ALL_AUTHORS);
  const resultBooks = useQuery(ALL_BOOKS);

  const client = useApolloClient();

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) =>
      set.map((p) => p.id).includes(object.id);

    const dataInStore = client.readQuery({ query: ALL_BOOKS });
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: [...dataInStore.allBooks, addedBook] },
      });
    }
  };

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded;
      notify(`${addedBook.title} added`);
      updateCacheWith(addedBook);
    },
  });

  if (resultAuthors.loading || resultBooks.loading)
    return <div>Loading...</div>;

  const logout = () => {
    setToken(null);
    setPage("login");
    localStorage.removeItem("library-token");
    client.resetStore(); // resets the cache of the apollo client
  };

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => setErrorMessage(null), 5000);
  };

  return resultBooks.loading && resultAuthors.loading ? null : (
    <div>
      <Notify errorMessage={errorMessage} />
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token ? (
          <>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={() => setPage("recommend")}>recommend</button>
            <button onClick={logout}>log out</button>
          </>
        ) : (
          <button onClick={() => setPage("login")}>login</button>
        )}
      </div>

      <Authors
        show={page === "authors"}
        authors={resultAuthors.data.allAuthors}
        token={token}
      />

      <Books show={page === "books"} books={resultBooks.data.allBooks} />

      <NewBook
        show={page === "add"}
        setError={notify}
        updateCacheWith={updateCacheWith}
      />

      <Recommend show={page === "recommend"} />

      {!token && (
        <div>
          <LoginForm
            show={page === "login"}
            setToken={setToken}
            setError={notify}
            setPage={setPage}
          />
        </div>
      )}
    </div>
  );
};

export default App;
