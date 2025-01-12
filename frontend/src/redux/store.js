// import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import { authSlice } from "./slices/auth";
// import { chatAppApi } from "./api/api";
// import miscSlice from "./slices/misc";
// import chatSlice from "./slices/chat";
// import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";

// // Configure persist options
// const persistConfig = {
//   key: 'root',
//   storage,
//   // Add any reducer names you want to blacklist (not persist)
//   blacklist: [chatAppApi.reducerPath] // Usually you don't want to persist API states
// };

// // Combine all reducers
// const rootReducer = combineReducers({
//   [authSlice.name]: authSlice.reducer,
//   [miscSlice.name]: miscSlice.reducer,
//   [chatSlice.name]: chatSlice.reducer,
//   [chatAppApi.reducerPath]: chatAppApi.reducer,
// });

// // Create persisted reducer
// const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         // Ignore redux-persist actions
//         ignoredActions: [
//           "persist/PERSIST",
//           "persist/REHYDRATE",
//           "persist/REGISTER",
//         ],
//       },
//     }).concat(chatAppApi.middleware),
//   devTools: true,
// });


// export const persistor = persistStore(store);


import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices/auth";
import { chatAppApi } from "./api/api";
import miscSlice from "./slices/misc";
import chatSlice from "./slices/chat";

export default configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [miscSlice.name]: miscSlice.reducer,
    [chatSlice.name]: chatSlice.reducer,
    [chatAppApi.reducerPath]: chatAppApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(chatAppApi.middleware),
  devTools: true,
});