import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { ALL_AUTHORS, ALL_BOOKS } from "./queries";
import { useQuery } from "@apollo/client";
import { Routes, Route, Link } from "react-router-dom";

const App = () => {
  const authors = useQuery(ALL_AUTHORS);
  const books = useQuery(ALL_BOOKS);
  console.log(books);
  if (authors.loading | books.loading) {
    return null;
  }

  const padding = {
    padding: 5
  }
  return (
    <div>
      <div>
        <Link style={padding} to="/">authors</Link>
        <Link style={padding} to="/books">books</Link>
        <Link style={padding} to="/add">add</Link>
      </div>
      <Routes>
        <Route
          path="/"
          element={<Authors authors={authors.data?.allAuthors} />}
        />
        <Route path="/books" element={<Books books={books.data?.allBooks} />} />
        <Route path="/add" element={<NewBook />} />
      </Routes>
    </div>
  );
};

export default App;
