import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs);

  const blogsToShow = [...blogs].sort((a, b) => b.likes - a.likes);

  return (
    <div>
      {blogsToShow.map((blog) => (
        <div key={blog.id}>
          <Link to={`blogs/${blog.id}`}>{blog.title}</Link>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
