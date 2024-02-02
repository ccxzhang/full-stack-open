import { createSlice } from "@reduxjs/toolkit"


const notificationSlice = createSlice({
    name: 'notifications',
    initialState: '',
    reducers: {
        showNotification(state, action) {
            return action.payload;
        }
    },
})

export const setNotification = (notification, timeout=5) => {
    return async dispatch => {
        dispatch(showNotification(notification))
        setTimeout(() => {
            dispatch(showNotification(''));
        }, timeout * 1000);
    }
}


export const { showNotification } = notificationSlice.actions
export default notificationSlice.reducer