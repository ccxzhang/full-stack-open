import { useDispatch } from 'react-redux';
import { logInUser } from '../reducers/loginReducer';
import { initializeBlogs } from '../reducers/blogReducer';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    const credential = {
      username: event.target.username.value,
      password: event.target.password.value,
    };
    event.target.username.value = '';
    event.target.password.value = '';
    dispatch(logInUser(credential));
    navigate('/');
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            id="username"
            name="username"
          />
        </div>
        <div>
          password
          <input
            type="password"
            id="password"
            name="password"
          />
        </div>
        <button type="submit" id="login-button">
          login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
