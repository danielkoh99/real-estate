import { useState, useCallback, useEffect } from "react";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { getSession } from "next-auth/react";

import { apiRequest } from "@/utils/index";

type Method = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface UseApiProps {
  url: string;
  method?: Method;
  data?: any;
  config?: AxiosRequestConfig;
  timeout?: number; // Optional timeout in milliseconds
  autoFetch?: boolean; // Flag to determine automatic fetching on mount
}

const useApi = <T = any>({
  url,
  method = "GET",
  data = null,
  config = {},
  timeout = 5000,
  autoFetch = false, // Default to manual fetching
}: UseApiProps) => {
  const [response, setResponse] = useState<AxiosResponse<T>>();
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetch = useCallback(async () => {
    const session = await getSession();

    setLoading(true);
    setError(null);
    const token = session?.user.accessToken;

    try {
      const axiosConfig: AxiosRequestConfig = {
        method,
        url,
        timeout,
        headers: {
          "Content-Type": "application/json",
          ...config.headers,
          Authorization: token ? `Bearer ${token}` : "",
        },
        ...(data && { data }),
      };

      const result = await apiRequest<T>({
        url,
        method,
        data,
        config: { ...config, headers: axiosConfig.headers },
        timeout,
      });
      console.log(result)
      if (!result.response) {
        setError("No data found");
      } else {
        setResponse(result.response);
      }
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [url, method, data, config, timeout]);

  // Automatically fetch data on mount if `autoFetch` is true
  useEffect(() => {
    if (autoFetch) {
      fetch();
    }
  }, [autoFetch, fetch]);

  return { response, error, loading, fetch };
};

export default useApi;
