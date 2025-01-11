import { chatAppApi } from "../api";

const USER_URL = "/user";

export const userApi = chatAppApi.injectEndpoints({
  endpoints: (builder) => ({
    searchUser: builder.query({
      query: (name) => ({
        url: `${USER_URL}/search?user=${name}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["User"],
    }),
    sendFriendRequest: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/send-request`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),

    getNotification: builder.query({
      query: () => ({
        url: `${USER_URL}/notifications`,
        method: "GET",
        credentials: "include",
      }),
      keepUnusedDataFor: 0,
    }),
  }),
});

export const {
  useLazySearchUserQuery,
  useSendFriendRequestMutation,
  useGetNotificationQuery,
} = userApi;
