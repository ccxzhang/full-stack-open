import axios from 'axios';
const baseUrl = '/api/users';

let token = null;

const getAll = async () => {
  const request = axios.get(baseUrl);
  const response = await request;
  return response.data;
};

const saveUserToken = (user) => {
  window.localStorage.setItem('loggedInUser', JSON.stringify(user));
  token = user.token;
};

const getSavedUser = () => {
  const loggedUserJSON = window.localStorage.getItem('loggedInUser');
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON);
    token = user.token;
    return user;
  }
  return null;
};

const clearUser = () => {
  localStorage.clear();
  token = null;
};

export default { getAll, getSavedUser, clearUser, saveUserToken };
