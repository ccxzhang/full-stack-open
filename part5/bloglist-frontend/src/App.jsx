import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';
import Notification from './components/Notification';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState({ 'message': null, 'type': null });
  const [user, setUser] = useState(null);
  const [refreshData, setRefreshData] = useState(false);
  const [newBlog, setNewBlog] = useState({
    'title': '',
    'author': '',
    'url': ''
  });

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    );
  }, [refreshData]);

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedInUser');
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson);
      setUser(user);
      blogService.setToken(user.token);
    }

  }, []);

  const blogFormRef = useRef();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      setUser(user);
      window.localStorage.setItem('loggedInUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUsername('');
      setPassword('');
    } catch (exception) {
      setErrorMessage({ 'message': 'Wrong username or password', 'type': 'error' });
      setTimeout(() => {
        setErrorMessage({ 'message': null, 'type': null });
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.clear();
    setUser(null);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewBlog({
      ...newBlog,
      [name]: value
    });
  };

  const addBlog = async (event) => {
    blogFormRef.current.toggleVisibility();
    event.preventDefault();
    const returnedBlog = await blogService.create(newBlog);
    setRefreshData(!refreshData);
    setErrorMessage({ 'message': `a new blog ${newBlog.title} by ${newBlog.author} added.`, 'type': 'message' });
    setTimeout(() => {
      setErrorMessage({ 'message': null, 'type': null });
    }, 5000);
    setNewBlog({ title: '', author: '', url: '' });
  };

  const updateLikes = async (id, updatedObject) => {
    const returnedBlog = await blogService.update(id, updatedObject);
    setRefreshData(!refreshData);
  };

  const removeBlog = async(id) => {
    const returnedBlog = await blogService.remove(id);
    setRefreshData(!refreshData);
  };

  const blogsToShow = blogs
    .filter(blog => blog.user.username == user?.username)
    .sort((a, b) => b.likes - a.likes);

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );


  const LogOutButton = () => (
    <button type='submit' onClick={handleLogout}>logout</button>
  );

  const blogForm = () => (
    <Togglable buttonLabel='new note' ref={blogFormRef}>
      <BlogForm newBlog={newBlog} handleSubmit={addBlog} handleChange={handleChange} />
    </Togglable>
  );

  return (
    <div>
      <h2>blogs</h2>
      <Notification info={errorMessage} />
      {!user && loginForm()}
      {user && <div>
        <p>
          {user.name} logged in <LogOutButton />
        </p>
        {blogForm()}
      </div>
      }
      {blogsToShow.map(blog =>
        <Blog key={blog.id} blog={blog} updateLikes={updateLikes} removeBlog={removeBlog} />
      )}
    </div>
  );
};


export default App;