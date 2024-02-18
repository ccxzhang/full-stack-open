import { useDispatch } from 'react-redux';
import { login } from '../reducers/loginReducer';

const LoginForm = () => {
  const dispatch = useDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();
    const credential = {
      username: event.target.username.value,
      password: event.target.password.value,
    };
    dispatch(login(credential));
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
            name="Password"
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
