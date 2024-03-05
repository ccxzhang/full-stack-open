import { useState } from "react";
import { EDIT_AUTHOR, ALL_AUTHORS } from "../queries";
import { useMutation } from "@apollo/client";

const Authors = ({ authors }) => {
  const [name, setName] = useState("");
  const [year, setYear] = useState("");

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      const messages = error.graphQLErrors.map((e) => e.message).join("\n");
      console.log(messages);
    },
  });

  const updateInfo = (event) => {
    event.preventDefault();
    editAuthor({ variables: { name, year } });
    setName("");
    setYear("");
  };

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
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
      <h3> Set BirthYear </h3>
      <form onSubmit={updateInfo}>
        <div>
          name
          <select onChange={(e) => setName(e.target.value)} value={name}>
            {authors.map((a) => (
              <option key={a.id} value={a.name}>
                {a.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          born
          <input
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
          />
          <button type="submit">submit</button>
        </div>
      </form>
    </div>
  );
};

export default Authors;
