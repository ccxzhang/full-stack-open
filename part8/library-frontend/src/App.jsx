import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import Recommend from "./components/Recommend";
import { BOOK_ADDED } from "./queries";
import { useEffect, useState } from "react";
import { ALL_AUTHORS, ALL_BOOKS, USER } from "./queries";
import { useApolloClient, useQuery, useSubscription } from "@apollo/client";
import { Routes, Route, Link } from "react-router-dom";

export const updateCache = (cache, query, addedBook) => {
  // helper that is used to eliminate saving same person twice
  const uniqByName = (a) => {
    let seen = new Set();
    return a.filter((item) => {
      let k = item.title;
      return seen.has(k) ? false : seen.add(k);
    });
  };

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByName(allBooks.concat(addedBook)),
    };
  });
};

const App = () => {
  const [token, setToken] = useState(null);
  const [genre, setGenre] = useState(null);
  const authors = useQuery(ALL_AUTHORS);
  const books = useQuery(ALL_BOOKS, { variables: { genre } });
  const user = useQuery(USER);
  const client = useApolloClient();

  console.log(books.data);
  

  useEffect(() => {
    const savedToken = window.localStorage.getItem("user-token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      console.log(data);
      const addedBook = data.data.bookAdded;
      window.alert(`${addedBook?.title} added`);
      updateCache(client.cache, { query: ALL_BOOKS }, addedBook);
    },
  });

  if (authors.loading | books.loading) {
    return null;
  }



  const logOut = () => {
    window.localStorage.clear();
    setToken(null);
    client.resetStore();
  };

  const padding = {
    padding: 5,
  };

  if (!token) {
    return (
      <div>
        <h2>Login</h2>
        <LoginForm setToken={setToken} />
      </div>
    );
  }

  return (
    <div>
      <div>
        <Link to="/">
          <button style={padding}>authors</button>
        </Link>
        <Link to="/books">
          <button style={padding}>books</button>
        </Link>
        <Link to="/add">
          <button style={padding}>add book</button>
        </Link>
        <Link to="/recommend">
          <button style={padding}>recommend</button>
        </Link>
        <button style={padding} type="submit" onClick={logOut}>
          logout
        </button>
      </div>
      <Routes>
        <Route
          path="/"
          element={<Authors authors={authors.data?.allAuthors} />}
        />
        <Route
          path="/books"
          element={
            <Books
              books={books.data?.allBooks}
              genre={genre}
              setGenre={setGenre}
            />
          }
        />
        <Route path="/add" element={<NewBook />} />
        <Route
          path="/recommend"
          element={
            <Recommend
              books={books.data?.allBooks}
              favoriateGenre={user.data?.me?.favoriteGenre}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
