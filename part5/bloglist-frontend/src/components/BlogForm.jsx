import PropTypes from 'prop-types';
import { useState } from 'react';

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({
    'title': '',
    'author': '',
    'url': ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewBlog({
      ...newBlog,
      [name]: value
    });
  };

  const addBlog = (event) => {
    event.preventDefault();
    createBlog(newBlog);
    setNewBlog({ title: '', author: '', url: '' });
  };

  return (
    <form onSubmit={addBlog}>
      <div>
        title:
        <input
          id='title-input'
          type="text"
          value={newBlog.title}
          name="title"
          onChange={handleChange}
        />
      </div>
      <div>
        author:
        <input
          id='author-input'
          type="text"
          value={newBlog.author}
          name="author"
          onChange={handleChange}
        />
      </div>
      <div>
        url:
        <input
          id='url-input'
          type="text"
          value={newBlog.url}
          name="url"
          onChange={handleChange}
        />
      </div>
      <button type="submit">create</button>
    </form>
  );
};

BlogForm.PropTypes = {
  createBlog: PropTypes.func.isRequired
};

export default BlogForm;