import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    appendBlogs(state, action) {
      state.push(action.payload);
    },
    remove(state, action) {
      const id = action.payload;
      return state.filter((blog) => blog.id !== id);
    },
    like(state, action) {
      const likedBlog = action.payload;
      const id = likedBlog.id;
      return state.map((blog) => (blog.id !== id ? blog : likedBlog));
    },
  },
});

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content);
    dispatch(appendBlogs(newBlog));
  };
};

export const addLike = (blog) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.update(blog.id, {
      ...blog,
      likes: blog.likes + 1,
    });
    dispatch(like(updatedBlog));
  };
};

export const deleteBlog = (id) => {
  return async (dispatch) => {
    const deletedBlog = await blogService.remove(id);
    dispatch(remove(deletedBlog));
  };
};

export const { setBlogs, appendBlogs, like, remove } = blogSlice.actions;
export default blogSlice.reducer;
