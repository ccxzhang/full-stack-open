import { createSlice } from '@reduxjs/toolkit';
import loginService from '../services/login';
import blogService from '../services/blogs';
import userService from '../services/user';
import { setNotification } from './notificationReducer';

const logInSlice = createSlice({
  name: 'login',
  initialState: null,
  reducers: {
    LogIn(state, action) {
      return action.payload;
    },
    LogOut(state, action) {
      return null;
    },
  },
});

export const { LogIn, LogOut } = logInSlice.actions;
export default logInSlice.reducer;

export const reloadSavedUser = () => {
  return async (dispatch) => {
    const loggedInUser = await userService.getSavedUser();
    if (loggedInUser) {
      dispatch(LogIn(loggedInUser));
      blogService.setToken(loggedInUser.token);
    }
  };
};

export const logInUser = (credential) => {
  return async (dispatch) => {
    try {
      const { username, password } = credential;
      const user = await loginService.login({ username, password });
      dispatch(LogIn(user));
      userService.saveUserToken(user);
      blogService.setToken(user.token);
    } catch (exception) {
      dispatch(setNotification('Wrong username or password', 5 ,'error'));
    }
  };
};

export const logOutUser = () => {
  return async (dispatch) => {
    userService.clearUser();
    dispatch(LogOut());
  };
};
