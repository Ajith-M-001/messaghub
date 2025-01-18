import { createSlice } from "@reduxjs/toolkit";
import { adminLogin, adminLogout, getAdmin } from "../thunks/admin";
import { toast } from "react-hot-toast";

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
  extraReducers: (builder) => {
    builder
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.isAdmin = true;
        state.loader = false;
        toast.success(action.payload.message);
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.isAdmin = false;
        state.loader = false;
        toast.error(action.error.message);
      })
      .addCase(getAdmin.fulfilled, (state, action) => {
        if (action.payload.admin) {
          state.isAdmin = true;
        } else {
          state.isAdmin = false;
        }
      })
      .addCase(getAdmin.rejected, (state) => {
        state.isAdmin = false;
      })
      .addCase(adminLogout.rejected, (state, action) => {
        state.isAdmin = true;
        console.log(action.error.message);
      })
      .addCase(adminLogout.fulfilled, (state, action) => {
        state.isAdmin = false;
        toast.success(action.payload.message);
      });
  },
});

// Action creators are generated for each case reducer function
export const { userExists, userNotExists } = authSlice.actions;

export const selectAuth = (state) => state.auth;

export default authSlice.reducer;
