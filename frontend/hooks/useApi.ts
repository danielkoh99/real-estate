import { useState, useEffect, useCallback } from "react";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { getSession } from "next-auth/react";

import apiRequest from "@/utils/customFetch";

type Method = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface UseApiProps {
  url: string;
  method?: Method;
  data?: any;
  config?: AxiosRequestConfig;
  timeout?: number; // Optional timeout in milliseconds
}

const useApi = <T = any>({
  url,
  method = "GET",
  data = null,
  config = {},
  timeout = 5000,
}: UseApiProps) => {
  const [response, setResponse] = useState<AxiosResponse<T> | null>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = useCallback(async () => {
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
          ...config.headers, // Preserve existing headers from config
          Authorization: token ? `Bearer ${token}` : "", // Add Authorization header
        },
        ...(data && { data }), // Include `data` only for non-GET requests
      };

      // Use the custom Axios function instead of directly calling Axios
      const result = await apiRequest<T>({
        url,
        method,
        data,
        config: { ...config, headers: axiosConfig.headers },
        timeout,
      });

      setResponse(result.response); // Assuming `result` contains a `response` object
      setLoading(false);
    } catch (err: { message: string } | any) {
      setError(err); // Handle any error thrown during the request
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }, [url, method, data, config, timeout]);

  useEffect(() => {
    fetchData();
  }, [fetchData]); // Add fetchData as a dependency

  return { response, error, loading, refetch: fetchData };
};

export default useApi;
