import Togglable from './Togglable';

const Blog = ({ blog, updateLikes, removeBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  };

  const hanldeUpdate = () => {
    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1
    };

    updateLikes(blog.id, updatedBlog);
  };

  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      removeBlog(blog.id);
    }
  };

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author} <Togglable buttonLabel="view">
        <div>
          <ul> URL: {blog.url} </ul>
          <ul>
            Likes: {blog.likes}
            <button type="submit" onClick={hanldeUpdate}>like</button>
          </ul>
          <ul> Author: {blog.author} </ul>
          <button type="submit" onClick={handleDelete}>remove</button>
        </div>
      </Togglable>
    </div>
  );
};

export default Blog;