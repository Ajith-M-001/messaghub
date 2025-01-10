import { chatAppApi } from "../api";

const CHAT_URL = "/chat";

const chatApi = chatAppApi.injectEndpoints({
  endpoints: (build) => ({
    getChat: build.query({
      query: () => ({
        url: `${CHAT_URL}/my-chats`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Chat"],
      //   keepUnusedDataFor: 5,
    }), 
      
      
  }),
});

export const { useGetChatQuery } = chatApi;
