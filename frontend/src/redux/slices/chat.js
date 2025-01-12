import { createSlice } from "@reduxjs/toolkit";
import { getOrSaveFromStorage } from "../../lib/features";
import { NEW_MESSAGE_ALERT } from "../../components/constants/events";

const initialState = {
  notificationCount: 0,
  newMessagesAlet:
    getOrSaveFromStorage({ key: NEW_MESSAGE_ALERT, get: true }) || [],
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    incrementNotification: (state) => {
      state.notificationCount += 1;
    },
    resetNotification: (state) => {
      state.notificationCount = 0;
    },
    setNewMessagesAlert: (state, action) => {
      const index = state.newMessagesAlet.findIndex(
        (item) => item.chatId === action.payload.chatId
      );

      if (index !== -1) {
        state.newMessagesAlet[index].count += 1;
      } else {
        state.newMessagesAlet.push({
          chatId: action.payload.chatId,
          count: 1,
        });
      }
    },
    removeNewMessagesAlert: (state, action) => {
      state.newMessagesAlet = state.newMessagesAlet.filter(
        (item) => item.chatId !== action.payload
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  incrementNotification,
  resetNotification,
  setNewMessagesAlert,
  removeNewMessagesAlert,
} = chatSlice.actions;

export const selectchat = (state) => state.chat;

export default chatSlice;
