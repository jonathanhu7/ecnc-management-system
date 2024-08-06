import axiosInstance from "../api/axiosInstance";
import { User } from "../types/User";
import qs from "qs";

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
  user: User;
  expires_in: number;
}

class AuthService {
  public async login(data: LoginRequest): Promise<LoginResponse> {
    const response = await axiosInstance.post<LoginResponse>(
      "/auth/login",
      qs.stringify(data) // 当后端期望表单数据而不是 JSON 数据时，则需要使用 qs 进行序列化
    );
    return response.data;
  }

  public async getCurrentUser(): Promise<User> {
    const response = await axiosInstance.get<User>("/auth/me");
    return response.data;
  }
}

export default new AuthService();
