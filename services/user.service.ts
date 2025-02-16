import api from "@/api/axios";
import { UserProfile } from "@/common/types/user";

const userService = {
  getUserProfile: (userId: number) => api.get<UserProfile>(`/users/${userId}`),
};

export default userService;
