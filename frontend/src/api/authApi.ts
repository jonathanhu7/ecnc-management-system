import { User } from "@/types/types";
import axiosInstance from "./axiosInstance";

export interface LoginResponse {
  data: {
    token: string;
    user: User;
  };
  message: string;
  status: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

// 当一个函数被标为 async 的时候，这个函数会自动返回一个 Promise
// Promise<LoginResponse> 表示这个函数会返回一个 LoginResponse 类型的 Promise
export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await axiosInstance.post<LoginResponse>("/auth/login", data);
  return response.data;
};
