import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { store } from "@/store/store";
import { logout } from "@/store/slices/auth.slices";

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await SecureStore.deleteItemAsync("token");
      store.dispatch(logout());
    }
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

export default api;
