import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices/auth";
import { chatAppApi } from "./api/api";
import miscSlice from "./slices/misc";

export default configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [miscSlice.name]: miscSlice.reducer,
    [chatAppApi.reducerPath]: chatAppApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(chatAppApi.middleware),
  devTools: true,
});
