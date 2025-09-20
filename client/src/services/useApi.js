import { useState } from "react";

/**
 * Custom API hook with fallback support
 * @param {Object} config
 * @param {Function} config.endpoint - async function for API call
 * @param {Function} config.onSuccess - optional callback on success
 * @param {Function} config.onError - optional callback on error
 * @param {any} config.fallbackData - optional fallback data if API fails
 */
export const useApi = ({
  endpoint = async () => {},
  onSuccess = () => {},
  onError = () => {},
  fallbackData = null,
} = {}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(fallbackData);

  const resolve = async (body) => {
    setIsLoading(true);
    setIsError(false);
    setIsSuccess(false);
    setError(null);

    try {
      const responseBody = await endpoint(body);
      setData(responseBody);
      setIsSuccess(true);
      if (onSuccess) onSuccess(responseBody);
    } catch (err) {
      console.warn(`⚠️ API call failed: ${err.message}. Using fallback data.`);
      setData(fallbackData); // use fallback automatically
      setIsError(true);
      setError(err);
      if (onError) onError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { resolve, isLoading, isError, isSuccess, error, data };
};
