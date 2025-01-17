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
    getMyGroups: build.query({
      query: () => ({
        url: `${CHAT_URL}/my-group`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Chat"],
    }),
    createNewGroup: build.mutation({
      query: ({ name, members }) => ({
        url: `${CHAT_URL}/new`,
        method: "POST",
        body: { name, members },
        credentials: "include",
      }),
      invalidatesTags: ["Chat"],
    }),
    renameGroup: build.mutation({
      query: ({ chatId, name }) => ({
        url: `${CHAT_URL}/${chatId}`,
        method: "PUT",
        credentials: "include",
        body: { name },
      }),
      invalidatesTags: ["chat"],
    }),
    removeGroupMember: build.mutation({
      query: ({ chatId, userId }) => ({
        url: `${CHAT_URL}/remove-member`,
        method: "PUT",
        body: { chatId, userId },
        credentials: "include",
      }),
      invalidatesTags: ["Chat"],
    }),
    addGroupMember: build.mutation({
      query: ({ chatId, members }) => ({
        url: `${CHAT_URL}/add-member`,
        method: "PUT",
        body: { chatId, members },
        credentials: "include",
      }),
      invalidatesTags: ["Chat"],
    }),
    deleteChat: build.mutation({
      query: (chatId) => ({
        url: `${CHAT_URL}/${chatId}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["chat"],
    }),
    leaveGroup: build.mutation({
      query: (chatId) => ({
        url: `${CHAT_URL}/leave/${chatId}`,
        method: "DELETE",
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
  useGetMessagesQuery,
  useSendAttachmentsMutation,
  useGetMyGroupsQuery,
  useCreateNewGroupMutation,
  useRenameGroupMutation,
  useRemoveGroupMemberMutation,
  useAddGroupMemberMutation,
  useDeleteChatMutation,
  useLeaveGroupMutation,
} = chatApi;
