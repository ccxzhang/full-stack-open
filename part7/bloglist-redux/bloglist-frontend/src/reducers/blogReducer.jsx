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
    change(state, action) {
      return state.map((blog) =>
        blog.id !== action.payload.id ? blog : action.payload
      );
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
    dispatch(change(updatedBlog));
  };
};

export const deleteBlog = (id) => {
  return async (dispatch) => {
    const deletedBlog = await blogService.remove(id);
    dispatch(remove(deletedBlog));
  };
};

export const commentBlog = (id, comment) => {
  return async (dispatch) => {
    const changedBlog = await blogService.comment(id, comment);
    dispatch(change(changedBlog));
  };
};

export const { setBlogs, appendBlogs, change, remove } = blogSlice.actions;
export default blogSlice.reducer;
