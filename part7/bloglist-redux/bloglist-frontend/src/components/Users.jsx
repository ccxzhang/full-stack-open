import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Users = () => {
  const users = useSelector((state) => {
    return state.users.filter((user) => user.username !== 'root');
  });

  return (
    <>
      <h2>Users</h2>
      <table>
        <tr>
          <td> </td>
          <td>
            <b>blogs created</b>
          </td>
        </tr>
        {users.map((user) => (
          <tr key={user.id}>
            <td>
              <Link to={`/users/${user.id}`}>{user.name} </Link>
            </td>
            <td>{user.blogs.length}</td>
          </tr>
        ))}
      </table>
    </>
  );
};

export default Users;
