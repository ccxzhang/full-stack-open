import { useSelector, useDispatch } from 'react-redux';
import Blog from './Blog';

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs);

  const blogsToShow = [...blogs].sort((a, b) => b.likes - a.likes);

  return (
    <div>
      {blogsToShow.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogList;
