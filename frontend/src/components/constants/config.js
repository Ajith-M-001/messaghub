const server = import.meta.env.VITE_SERVER;
export const USER_URL = `${server}/user`;

//endpoints
export const getMyProfile = `${USER_URL}/get-my-profile`;
export const userLogin = `${USER_URL}/login`;
