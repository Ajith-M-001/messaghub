import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices/auth";
import { chatAppApi } from "./api/api";

export default configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [chatAppApi.reducerPath]: chatAppApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(chatAppApi.middleware),
  devTools: true,
  
});
