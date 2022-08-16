import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  loading: false,
  error: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    loginFailture: (state) => {
      state.loading = false;
      state.error = true;
    },
    logout: (state) => {
      state.user = null;
      state.loading = false;
      state.error = false;
    },
    subHandleUser: (state, action) => {
      state.loading = false;
      !state.user.subscribedUsers.includes(action.payload)
        ? state.user.subscribedUsers.push(action.payload)
        : state.user.subscribedUsers.splice(
            state.user.subscribedUsers.findIndex((userID) => userID === action.payload),
            1,
          );
    },
  },
});

// Action creators are generated for each case reducer function
export const { loginStart, loginSuccess, loginFailture, subHandleUser, logout } =
  userSlice.actions;

export const userSelector = (state) => state.user;

export default userSlice.reducer;
