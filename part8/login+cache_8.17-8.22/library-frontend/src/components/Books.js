import React, { useState, useEffect } from "react";

const Books = ({ books, show }) => {
  const [genres, setGenres] = useState([]);
  const [genre, setGenre] = useState("");
  const [filteredBooks, setFilteredBooks] = useState();

  useEffect(() => {
    const genresArr = [];
    books.map((book) => genresArr.push(book.genres));
    setGenres(genresArr);
  }, [books]);

  const showFliteredBook = (g) => {
    setGenre(g);
    const filteredBooks = books.filter((book) => book.genres.includes(g));
    setFilteredBooks(filteredBooks);
  };

  const showBooks = () => {
    setGenre("all");
    setFilteredBooks(books.map((b) => b));
  };

  const renderTable = (b) => (
    <tr key={b.title}>
      <td>{b.title}</td>
      <td>{b.author.name}</td>
      <td>{b.published}</td>
    </tr>
  );

  if (!show) return null;
  return (
    <div>
      <h2>books</h2>
      <p>{`in genre ${genre}`}</p>
      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks
            ? filteredBooks.map((a) => renderTable(a))
            : books.map((a) => renderTable(a))}
        </tbody>
      </table>
      {Array.from(new Set(genres.flat())).map((g) => (
        <button onClick={() => showFliteredBook(g)} key={g}>
          {g}
        </button>
      ))}
      <button onClick={() => showBooks()}>all genres</button>
    </div>
  );
};

export default Books;
