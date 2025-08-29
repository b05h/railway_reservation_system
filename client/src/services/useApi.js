import { useState } from "react";

export const useApi = (
  { endpoint, onSuccess, onError } = {
    endpoint: async () => { },
    onSuccess: () => { },
    onError: () => { },
  },
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const resolve = async (body) => {
    setIsLoading(true);
    setIsError(false);
    setIsSuccess(false);
    setError(null);
    setData(null);
    try {
      const responseBody = await endpoint(body);
      setIsSuccess(true);
      setData(responseBody);
      if (onSuccess) onSuccess(responseBody);
    } catch (error) {
      setIsError(true);
      setError(error.response.data);
      if (onError) onError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  return { resolve, isLoading, isError, isSuccess, error, data };
};
