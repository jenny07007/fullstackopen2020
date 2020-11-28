import React, { useState, useEffect } from "react";

const Recommend = ({ books, show, favoriteGenre }) => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const favb = books.filter((book) => book.genres[0] === favoriteGenre);
    setGenres(favb);
  }, [books, favoriteGenre]);

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
      <p>{`books in your favourite genre ${favoriteGenre}`}</p>
      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {genres
            ? genres.map((a) => renderTable(a))
            : books.map((a) => renderTable(a))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommend;
