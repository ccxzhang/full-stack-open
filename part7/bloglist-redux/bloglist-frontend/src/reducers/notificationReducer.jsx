import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: { message: null },
  reducers: {
    show(state, action) {
      return action.payload;
    },
    clear() {
      return { message: null };
    },
  },
});

export const setNotification = (message, timeout = 5, type = 'success') => {
  return async (dispatch) => {
    dispatch(show({ message, type }));
    setTimeout(() => {
      dispatch(clear());
    }, timeout * 1000);
  };
};

export const { show, clear } = notificationSlice.actions;
export default notificationSlice.reducer;
