import { AxiosRequestConfig, AxiosError } from "axios";
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

export const apiRequest = async <T = any>({
  url,
  method = "GET",
  data = null,
  config = {},
  timeout = 5000,
}: ApiRequestProps): Promise<T> => {
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

  try {
    const response = await api<T>(axiosConfig);

    return response.data;
  } catch (error: any) {
    if (error.isAxiosError) {
      const axiosError = error as AxiosError<any>;
      const errorMessage =
        axiosError.response?.data?.message ||
        axiosError.message ||
        "Unknown API error occurred";

      throw new Error(errorMessage);
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};
