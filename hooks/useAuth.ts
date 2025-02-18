import { useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { useAppDispatch, useAppSelector } from "./useRedux";
import {
  setAuthenticated,
  setLoading,
  setToken,
} from "@/store/slices/auth.slices";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, isLoading, token } = useAppSelector(
    (state) => state.auth
  );

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const storedToken = await SecureStore.getItemAsync("token");
      if (storedToken) {
        dispatch(setToken(storedToken));
        dispatch(setAuthenticated(true));
      } else {
        dispatch(setToken(null));
        dispatch(setAuthenticated(false));
      }
    } catch (error) {
      dispatch(setToken(null));
      dispatch(setAuthenticated(false));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const logout = async () => {
    try {
      await SecureStore.deleteItemAsync("token");
      dispatch(setToken(null));
      dispatch(setAuthenticated(false));
    } catch (error) {
      throw new Error(`Error logging out: ${error}`);
    }
  };

  return { isAuthenticated, isLoading, token, logout, checkAuth };
};
