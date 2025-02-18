import { useQuery } from "@tanstack/react-query";
import * as SecureStore from "expo-secure-store";
import { jwtDecode } from "jwt-decode";
import userService from "@/services/user.service";
import { DecodedToken } from "@/common/types/user";

export const useProfile = () => {
  const getUser = async () => {
    try {
      const token = await SecureStore.getItemAsync("token");
      if (!token) throw new Error("No token found");

      const decoded = jwtDecode<DecodedToken>(token);
      const userId = decoded.sub;

      const response = await userService.getUserProfile(userId);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  return useQuery({
    queryKey: ["userProfile"],
    queryFn: getUser,
    retry: 1,
  });
};
