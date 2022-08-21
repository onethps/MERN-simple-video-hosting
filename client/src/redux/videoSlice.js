import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  video: null,
  loading: false,
  error: false,
};

export const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {
    VideoStart: (state) => {
      state.loading = true;
    },
    VideoSuccess: (state, action) => {
      state.loading = false;
      state.video = action.payload;
    },
    VideoFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    likeVideo: (state, action) => {
      if (!state.video.likes.includes(action.payload)) {
        state.video.likes.push(action.payload);
        const indexUserId = state.video.dislikes.findIndex(
          (userId) => userId === action.payload,
        );
        state.video.dislikes.splice(indexUserId, 1);
      }
    },
    disLikeVideo: (state, action) => {
      if (!state.video.dislikes.includes(action.payload)) {
        state.video.dislikes.push(action.payload);
        const indexUserId = state.video.likes.findIndex(
          (userId) => userId === action.payload,
        );
        state.video.likes.splice(indexUserId, 1);
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { VideoStart, VideoSuccess, VideoFailure, likeVideo, disLikeVideo } =
  videoSlice.actions;

export default videoSlice.reducer;
