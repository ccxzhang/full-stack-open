import { createSlice } from '@reduxjs/toolkit';
import loginService from '../services/login';
import blogService from '../services/blogs';
import userService from '../services/user';
import { setNotification } from './notificationReducer';


const logInSlice = createSlice({
  name: 'login',
  initialState: null,
  reducers: {
    login(state, action) {
      return action.payload;
    },
    logout(state, action) {
      return null;
    },
  },
});

export const { login, logout } = logInSlice.actions;
export default logInSlice.reducer;

export const logInUser = (credential) => {
  return async (dispatch) => {
    try {
      const { username, password } = credential;
      const user = await loginService.login({ username, password });
      dispatch(login(user));
      userService.setUser(user);
      blogService.setToken(user.token);
    } catch (exception) {
      dispatch(setNotification('Wrong username or password'));
    }
  };
};

export const logOutUser = () => {
  return async (dispatch) => {
    userService.clearUser();
    dispatch(logout());
  };
};
