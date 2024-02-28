import { useState, useEffect, useRef } from 'react';
import BlogList from './components/BlogList';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Users from './components/Users';
import UserView from './components/User';
import Notification from './components/Notification';
import { useDispatch, useSelector } from 'react-redux';
import { initializeBlogs } from './reducers/blogReducer';
import { LogIn, logOutUser, reloadSavedUser } from './reducers/loginReducer';
import { initializeUsers } from './reducers/userReducer';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from 'react-router-dom';
import Blog from './components/Blog';

const App = () => {
  const login = useSelector((state) => state.login);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(reloadSavedUser());
    dispatch(initializeBlogs());
    dispatch(initializeUsers());
  }, [dispatch]);

  const handleLogOut = async (event) => {
    event.preventDefault();
    dispatch(logOutUser());
  };

  const LogOutButton = () => (
    <button type="submit" id="logout-button" onClick={handleLogOut}>
      logout
    </button>
  );

  const Home = () => (
    <div>
      <h2>blogs</h2>
      <Notification />
      <div>
        <BlogForm />
        <BlogList />
      </div>
    </div>
  );

  const padding = {
    padding: 5,
  };

  if (!login) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification />
        <LoginForm />
      </div>
    );
  }

  return (
    <div>
      <div>
        <Link style={padding} to="/">
          home
        </Link>
        <Link style={padding} to="/users">
          users
        </Link>
        <>
          <em>{login?.name} logged in</em>
          <LogOutButton />
        </>
        <Notification />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={login ? <Home /> : <LoginForm />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<UserView />} />
        <Route path="/blogs/:id" element={<Blog />} />
      </Routes>
    </div>
  );
};

export default App;
