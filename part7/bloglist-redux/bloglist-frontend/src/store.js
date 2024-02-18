import { configureStore } from '@reduxjs/toolkit';
import blogReducer from './reducers/blogReducer';
import notificationReducer from './reducers/notificationReducer';
import loginReducer from './reducers/loginReducer';
import userReducer from './reducers/userReducer';

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    notifications: notificationReducer,
    login: loginReducer,
    user: userReducer
  },
});

store.subscribe(() => {
  console.log(store.getState());
});

export default store;
