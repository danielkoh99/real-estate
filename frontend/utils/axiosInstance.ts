import axios from "axios";
import { signOut } from "next-auth/react";
// Set up an Axios instance
const api = axios.create({
  baseURL: process.env.API_URL,
});

// Axios interceptor to handle 401 errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      signOut();
    }

    return Promise.reject(error);
  }
);
export default api;
