import { chatAppApi } from "../api";

const ADMIN_URL = "/admin";

const adminApi = chatAppApi.injectEndpoints({
  endpoints: (build) => ({
    dashboardStats: build.query({
      query: () => ({
        url: `${ADMIN_URL}/stats`,
        method: "GET",
        credentials: "include",
      }),
    }),
    userManagement: build.query({
      query: () => ({
        url: `${ADMIN_URL}/users`,
        method: "GET",
        credentials: "include",
      }),
    }),
    chatManagement: build.query({
      query: () => ({
        url: `${ADMIN_URL}/chats`,
        method: "GET",
        credentials: "include",
      }),
    }),
    messageManagement: build.query({
      query: () => ({
        url: `${ADMIN_URL}/messages`,
        method: "GET",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useDashboardStatsQuery,
  useUserManagementQuery,
  useChatManagementQuery,
  useMessageManagementQuery,
} = adminApi;
