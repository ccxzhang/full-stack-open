const Recommend = ({ books, favoriateGenre }) => {
  const recommendedBooks = books.filter((b) =>
    b.genres.includes(favoriateGenre)
  );

  return (
    <div>
      <h2>Recommendations</h2>
      <p>
        Books in Your Favoriate Genre <b>{favoriateGenre}</b>
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {recommendedBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommend;
