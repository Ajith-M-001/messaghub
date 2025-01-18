import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = "http://localhost:5000/api/v1";

export const adminLogin = createAsyncThunk(
  "admin/adminLogin",
  async (secretKey) => {
    try {
      const config = {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.post(
        `${baseURL}/admin/verify`,
        { secretKey },
        config
      );
      return response.data;
    } catch (error) {
      console.log(error.response.data.message);
      throw new Error(error.response.data.message);
    }
  }
);
export const getAdmin = createAsyncThunk("admin/getAdmin", async () => {
  try {
    const response = await axios.get(`${baseURL}/admin`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.log(error.response.data.message);
    throw new Error(error.response.data.message);
  }
});
export const adminLogout = createAsyncThunk("admin/adminLogout", async () => {
  try {
    const response = await axios.get(`${baseURL}/admin/logout`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.log(error.response.data.message);
    throw new Error(error.response.data.message);
  }
});
