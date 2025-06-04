import axios from "axios";
import { signOut } from "next-auth/react";
import { env } from "next-runtime-env";
// Set up an Axios instance
const api = axios.create({
  baseURL: env("NEXT_PUBLIC_API_URL") || process.env.NEXT_PUBLIC_API_URL,
});

// Axios interceptor to handle 401 errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      signOut();
    }

    return Promise.reject, error;
  }
);
export default api;
