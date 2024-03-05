import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => {
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
  const request = await axios.put(`${baseUrl}/${id}`, updatedObject);
  return request.data;
};

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = await axios.delete(`${baseUrl}/${id}`, config);
  return request.data;
};

const comment = async (id, comment) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = await axios.post(`${baseUrl}/${id}/comments`, { comment }, config);
  return request.data;
};

export default {
  setToken,
  getAll,
  create,
  update,
  remove,
  comment
};
