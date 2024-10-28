import { useState, useEffect, useCallback } from "react";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { getSession } from "next-auth/react";

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
        baseURL: process.env.NEXT_PUBLIC_API_URL,
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

      const result = await axios(axiosConfig);

      setResponse(result);
      setLoading(false);
    } catch (err: { message: string } | any) {
      setError(err); // ndle any error thrown during the request
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }, [url, method, data, config, timeout]);

  useEffect(() => {
    fetchData();
  }, []);

  return { response, error, loading, refetch: fetchData };
};

export default useApi;
