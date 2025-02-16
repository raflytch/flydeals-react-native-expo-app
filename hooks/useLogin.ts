import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { jwtDecode } from "jwt-decode";
import { useAppDispatch } from "./useRedux";
import { setAuthenticated, setToken } from "@/store/slices/auth.slices";
import authService from "@/services/auth.service";
import { LoginCredentials } from "@/common/types/auth";
import { DecodedToken } from "@/common/types/user";

export const useLogin = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const mutation = useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const response = await authService.login(credentials);
      return response.data;
    },
    onSuccess: async (data) => {
      if (data.token) {
        try {
          const decoded = jwtDecode<DecodedToken>(data.token);
          await SecureStore.setItemAsync("token", data.token);
          dispatch(setToken(data.token));
          dispatch(setAuthenticated(true));
          router.replace("/");
        } catch (error) {
          console.error("Invalid token received:", error);
          throw new Error("Invalid token received from server");
        }
      }
    },
  });

  return mutation;
};
