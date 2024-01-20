import PropTypes from 'prop-types';

const BlogForm = ({ newBlog, handleSubmit, handleChange }) => (
  <form onSubmit={handleSubmit}>
    <div>
      title:
      <input
        type="text"
        value={newBlog.title}
        name="title"
        onChange={handleChange}
      />
    </div>
    <div>
      author:
      <input
        type="text"
        value={newBlog.author}
        name="author"
        onChange={handleChange}
      />
    </div>
    <div>
      url:
      <input
        type="text"
        value={newBlog.url}
        name="url"
        onChange={handleChange}
      />
    </div>
    <button type="submit">create</button>
  </form>
);

BlogForm.PropTypes = {
  newBlog: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired
};

export default BlogForm;