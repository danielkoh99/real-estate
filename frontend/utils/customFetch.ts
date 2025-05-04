import { AxiosRequestConfig, AxiosResponse } from "axios";
import { getSession } from "next-auth/react";

import api from "@/utils/axiosInstance";

type Method = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface ApiRequestProps {
  url: string;
  method?: Method;
  data?: any;
  config?: AxiosRequestConfig;
  timeout?: number;
}

interface ApiResponse<T> {
  response: AxiosResponse<T> | null;
  error: any;
  loading: boolean;
}

export const apiRequest = async <T = any>({
  url,
  method = "GET",
  data = null,
  config = {},
  timeout = 5000,
}: ApiRequestProps): Promise<T> => {
  try {
    const session = await getSession();
    const token = session?.user.accessToken;

    const axiosConfig: AxiosRequestConfig = {
      method,
      url,
      timeout,
      headers: {
        "Content-Type": "application/json",
        ...config.headers,
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      ...(data && { data }),
      ...(config.params && { params: config.params }),
    };

    const response = await api<T>(axiosConfig);

    return response.data;
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
};
