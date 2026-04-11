import axios from "axios";
import { store } from "../store";

const axiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to inject the token from Redux state
axiosInstance.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Optional: Response interceptor for handling 401s
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Custom logic for handling unauthorized access (e.g. log the user out)
      // store.dispatch(logout());
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
