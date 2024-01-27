import { useState } from 'react';

const Blog = ({ blog, updateLikes, removeBlog, currentUser }) => {

  const [visible, setVisible] = useState(false);

  const changeVisibility = () => {
    setVisible(!visible);
  };


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

  const isUserAuthorized = currentUser && blog.user && currentUser.username === blog.user.username;

  return (
    <div style={blogStyle} className='blog'>
      <div className='title-author'>{blog.title} {blog.author}</div>
      {!visible && <button onClick={changeVisibility}>view</button>}
      {visible &&
      <>
        <button onClick={changeVisibility}>hide</button>
        <ul>URL: {blog.url} </ul>
        <ul> Likes: {blog.likes}
          <button type="submit" onClick={hanldeUpdate}>like</button>
        </ul>
        <ul> {blog?.user?.name} </ul>
        {isUserAuthorized && <button type="submit" onClick={handleDelete}>remove</button>}
      </>}
    </div>
  );
};


export default Blog;