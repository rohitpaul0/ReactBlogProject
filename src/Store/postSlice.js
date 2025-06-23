import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  loading: false,
  error: null,
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },

    addPost: (state, action) => {
      state.posts = [...state.posts, action.payload];
    },

    updatePost: (state, action) => {
      state.posts = state.posts.map((post) =>
        post.$id === action.payload.$id ? action.payload : post
      );
    },

    deletepost: (state, action) => {
      state.posts = state.posts.filter((post) => post.$id !== action.payload);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setPosts,
  addPost,
  updatePost,
  deletepost,
  setLoading,
  setError,
} = postSlice.actions;
export default postSlice.reducer;
