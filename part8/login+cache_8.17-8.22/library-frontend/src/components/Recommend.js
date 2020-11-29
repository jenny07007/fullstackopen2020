import React, { useEffect } from "react";
import { useQuery, useLazyQuery } from "@apollo/client";
import { ALL_BOOKS, FAVOURITE_GENRE } from "./queries";

const Recommend = ({ show }) => {
  const { loading, data: favGen } = useQuery(FAVOURITE_GENRE);

  const [
    getRecommendation,
    { loading: recBooksLoading, data: recBooksData },
  ] = useLazyQuery(ALL_BOOKS);

  useEffect(() => {
    if (favGen) {
      getRecommendation({
        variables: { genres: favGen?.me?.favoriteGenre },
      });
    }
  }, [getRecommendation, favGen]);

  console.log(recBooksData);

  const renderTable = (b) => (
    <tr key={b.title}>
      <td>{b.title}</td>
      <td>{b.author.name}</td>
      <td>{b.published}</td>
    </tr>
  );

  if (!show) return null;
  return loading ? null : (
    <div>
      <h2>books</h2>
      <p>{`books in your favourite genre ${favGen?.me?.favoriteGenre}`}</p>
      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {recBooksLoading
            ? null
            : recBooksData.allBooks.map((a) => renderTable(a))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommend;
