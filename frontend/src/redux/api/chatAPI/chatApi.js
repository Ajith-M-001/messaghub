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
    chatDetails: build.query({
      query: ({ chatId, populate = false }) => {
        let url = `${CHAT_URL}/${chatId}`;
        if (populate) {
          url += `?populate=${populate}`;
        }
        return {
          url,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["Chat"],
      //   keepUnusedDataFor: 5,
    }),
    acceptFriendRequest: build.mutation({
      query: (data) => ({
        url: `${CHAT_URL}/accept-request`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["chat"],
    }),
  }),
});

export const {
  useGetChatQuery,
  useChatDetailsQuery,
  useAcceptFriendRequestMutation,
} = chatApi;
