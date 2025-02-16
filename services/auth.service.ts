import api from "@/api/axios";
import { LoginCredentials, LoginResponse } from "@/common/types/auth";

const authService = {
  login: (credentials: LoginCredentials) =>
    api.post<LoginResponse>("/auth/login", credentials),
};

export default authService;
