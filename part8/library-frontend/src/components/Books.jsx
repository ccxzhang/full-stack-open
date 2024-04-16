/* eslint-disable react/jsx-key */
import { useState } from "react";

const Books = ({ books, genre, setGenre }) => {
  const flatArray = books.reduce((acc, obj) => acc.concat(obj.genres), []);
  const genres = Array.from(new Set(flatArray));

  // const filteredBooks = books.filter((book) =>
  // genre === null ? true : book.genres.includes(genre)
  // );

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr key="header">
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        {genres.map((g) => (
          <button onClick={() => setGenre(g)}>{g}</button>
        ))}
        <button onClick={() => setGenre(null)}>reset</button>
      </div>
    </div>
  );
};

export default Books;
