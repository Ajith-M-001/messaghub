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
      // providesTags: ["Chat"],
      keepUnusedDataFor: 0,
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
      // providesTags: ["Chat"],
      keepUnusedDataFor: 0,
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
    sendAttachments: build.mutation({
      query: (data) => ({
        url: `${CHAT_URL}/message`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    getMessages: build.query({
      query: ({ chatId, page }) => ({
        url: `${CHAT_URL}/message/${chatId}?page=${page}`,
        method: "GET",
        credentials: "include",
      }),
      // providesTags: ["Message"],
      keepUnusedDataFor: 0,
    }),
  }),
});

export const {
  useGetChatQuery,
  useChatDetailsQuery,
  useAcceptFriendRequestMutation,
  useGetMessagesQuery,
  useSendAttachmentsMutation,
} = chatApi;
