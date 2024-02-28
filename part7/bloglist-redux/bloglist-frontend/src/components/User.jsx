import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const UserView = () => {
  const id = useParams().id;
  const user = useSelector((state) => {
    return state.users.find((n) => n.id === String(id));
  });

  if (!user) {
    return null;
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h3> added blogs</h3>
      {user.blogs.map((blog) => (
        <li key={blog.id}>{blog.title}</li>
      ))}
    </div>
  );
};

export default UserView;
