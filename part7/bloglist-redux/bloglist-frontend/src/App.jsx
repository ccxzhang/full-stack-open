import { useState, useEffect, useRef } from 'react';
import BlogList from './components/BlogList';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import blogService from './services/blogs';
import userService from './services/user';
import { useDispatch, useSelector } from 'react-redux';
import { initializeBlogs } from './reducers/blogReducer';
import { logOutUser } from './reducers/loginReducer';
import { initializeUsers } from './reducers/userReducer';

const App = () => {

  const login = useSelector(state => state.login);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeUsers());
  }, [dispatch]);


  const blogFormRef = useRef();


  const LogOutButton = () => (
    <button type="submit" id="logout-button" onClick={dispatch(logOutUser())}>
      logout
    </button>
  );



  return (
    <div>
      <h2>blogs</h2>
      {/* <Notification info={errorMessage} /> */}
      {!login && LoginForm()}
      {login && (
        <div>
          <p>
            {login.name} logged in <LogOutButton />
          </p>
          {BlogForm()}
          {BlogList()}
        </div>
      )}
    </div>
  );

  // return (
  //   <div>
  //     <h2>blogs</h2>
  //     <Notification info={errorMessage} />
  //     {!user && loginForm()}
  //     {user && <div>
  //       <p>
  //         {user.name} logged in <LogOutButton />
  //       </p>
  //       {blogForm()}
  //     </div>
  //     }
  //     {blogsToShow.map(blog =>
  //       <Blog key={blog.id} blog={blog} updateLikes={updateLikes} removeBlog={removeBlog} />
  //     )}
  //   </div>
  // );
};

export default App;
