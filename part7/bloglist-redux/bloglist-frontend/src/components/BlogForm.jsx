import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createBlog } from '../reducers/blogReducer';
import { setNotification } from '../reducers/notificationReducer';
import Togglable from './Togglable';

const BlogForm = () => {
  const dispatch = useDispatch();

  const addBlog = (event) => {
    event.preventDefault();
    const newBlog = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value
    };
    dispatch(createBlog(newBlog));
    dispatch(setNotification(`a new blog ${newBlog.title} by ${newBlog.author} added.`));
  };

  return (
    <Togglable buttonLabel="new blog">
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            id="title-input"
            type="text"
            name="title"
          />
        </div>
        <div>
          author:
          <input
            id="author-input"
            type="text"
            name="author"
          />
        </div>
        <div>
          url:
          <input
            id="url-input"
            type="text"
            name="url"
          />
        </div>
        <button type="submit">create</button>
      </form>
    </Togglable>
  );
};

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
};

export default BlogForm;
