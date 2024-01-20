import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = newToken => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const request = axios.get(baseUrl);
  const response = await request;
  return response.data;
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const request = axios.post(baseUrl, newObject, config);
  const response = await request;
  return response.data;
};

const update = async (id, updatedObject) => {
  const request = axios.put(`${baseUrl}/${id}`, updatedObject);
  const response = await request;
  return response.data;
};

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = axios.delete(`${baseUrl}/${id}`, config);
  const response = await request;
  return response.data;
};

export default {
  setToken, getAll, create, update, remove
};