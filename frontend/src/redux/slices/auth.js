import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAdmin: false,
  loader: true,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userExists: (state, action) => {
      console.log(action);
      console.log(state);
      state.user = action.payload;
      state.loader = false;
    },
    userNotExists: (state) => {
      state.user = null;
      state.loader = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { userExists, userNotExists } = authSlice.actions;

export const selectAuth = (state) => state.auth;

export default authSlice.reducer;
