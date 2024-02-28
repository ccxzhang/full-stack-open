import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addLike, deleteBlog } from '../reducers/blogReducer';
import { setNotification } from '../reducers/notificationReducer';
import { useNavigate, useParams } from 'react-router-dom';

const Blog = () => {
  const [comment, setComment] = useState('');
  const authUser = useSelector((state) => state.login);
  const id = useParams().id;
  const blog = useSelector((state) => {
    return state.blogs.find((n) => n.id === String(id));
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUpdate = () => {
    dispatch(addLike(blog));
    dispatch(setNotification(`Liked ${blog.title}`));
  };

  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog.id));
      navigate('/');
    }
  };

  const addComment = () => {
    setComment('');
  };

  const isUserAuthorized =
    authUser && blog.user && authUser.username === blog.user.username;

  if (!blog) {
    return null;
  }

  return (
    <div>
      <h1>Blog App</h1>
      <h2>
        <b>
          {blog.title} {blog.author}
        </b>
      </h2>
      <ul>URL: {blog.url}</ul>
      <ul>
        Likes: {blog.likes}
        <button onClick={handleUpdate}>like</button>
      </ul>
      <ul>Added by {blog?.user?.name}</ul>
      {isUserAuthorized && <button onClick={handleDelete}>remove</button>}
      <h3>Comments</h3>
      <div>
        <input
          id="comment-input"
          type="text"
          name="comment"
          onChange={({ target }) => setComment(target.value)}
        />
        <button onClick={addComment}>add comment</button>
      </div>
    </div>
  );
};

export default Blog;
