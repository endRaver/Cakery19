import axios from "axios";
import { retryApi } from "./retryApi";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" ? "http://localhost:5000/api" : "/api",
});

const setupInterceptors = () => {
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      // For server errors (5xx) or network errors, retry 3 times
      if (error.response?.status >= 500 || !error.response) {
        // If this request is already being retried, don't start a new retry sequence
        if (originalRequest._isRetrying) {
          return Promise.reject(error);
        }

        originalRequest._isRetrying = true;
        try {
          return await retryApi(() => axiosInstance(originalRequest));
        } finally {
          originalRequest._isRetrying = false;
        }
      }

      return Promise.reject(error);
    }
  );
};

setupInterceptors();
export default axiosInstance;
