import { AxiosRequestConfig, AxiosResponse } from "axios";
import { getSession } from "next-auth/react";

import api from "@/helpers/axiosInstance";

type Method = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface ApiRequestProps {
  url: string;
  method?: Method;
  data?: any;
  config?: AxiosRequestConfig; // Configuration object for Axios
  timeout?: number; // Optional timeout in milliseconds
}

interface ApiResponse<T> {
  response: AxiosResponse<T> | null;
  error: any;
  loading: boolean;
}

const apiRequest = async <T = any>({
  url,
  method = "GET",
  data = null,
  config = {},
  timeout = 5000,
}: ApiRequestProps): Promise<ApiResponse<T>> => {
  let response: AxiosResponse<T> | null = null;
  let error: any = null;
  let loading = true;

  try {
    const session = await getSession();
    const token = session?.user.accessToken;

    const axiosConfig: AxiosRequestConfig = {
      method,
      url,
      timeout,
      headers: {
        "Content-Type": "application/json",
        ...config.headers, // Preserve existing headers from config
        Authorization: token ? `Bearer ${token}` : "", // Add Authorization header
      },
      ...(data && { data }), // Include `data` only for non-GET requests
      ...(config.params && { params: config.params }), // Include params if provided
    };

    response = await api(axiosConfig);
  } catch (err) {
    error = err; // Capture any error thrown during the request
  } finally {
    loading = false;
  }

  return { response, error, loading };
};

export default apiRequest;
