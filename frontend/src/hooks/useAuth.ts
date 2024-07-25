import { useState } from "react";
import { useMutation } from "react-query";
import AuthService, {
  LoginRequest,
  LoginResponse,
} from "../services/AuthService";
import { User } from "../types/User";
import { AxiosError } from "axios";
import { ErrorResponse } from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

// 创建一个自定义钩子，用于处理用户登录和登出
export const useAuth = () => {
  const [authError, setAuthError] = useState<string>(""); // authError 用来记录在 auth 中发生的错误
  const [currentUser, setCurrentUser] = useState<User>({} as User); // currentUser 用来记录当前用户
  const navigate = useNavigate();

  // 登录
  const loginMutation = useMutation<LoginResponse, AxiosError, LoginRequest>({
    mutationFn: (data: LoginRequest) => AuthService.login(data),
    onSuccess: (data: LoginResponse) => {
      setCurrentUser(data.user as User);
      console.log("data.user", data.user);
      console.log("currentUser", currentUser);
      localStorage.setItem("accessToken", data.access_token);
      // 登录成功后跳转到主页
      navigate("/");
    },
    onError: (error: AxiosError) => {
      const ErrorResponse = error.response?.data as ErrorResponse;
      setAuthError(ErrorResponse.detail);
    },
  });

  const login = async (data: LoginRequest) => {
    setAuthError(""); // 清空错误信息，如果 loginMutation 发生错误，会填充如错误信息

    await loginMutation.mutateAsync(data);
  };

  return { authError, currentUser, login };
};
