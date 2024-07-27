import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
  const [authError, setAuthError] = useState<string | null>(null); // authError 用来记录在 auth 中发生的错误
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // 判断当前时候登录
  const isLoggedIn = () => {
    return localStorage.getItem("accessToken") !== null;
  };

  // 获取当前用户信息
  const { data: currentUser, refetch: refetchCurrentUser } = useQuery<User>({
    queryKey: ["currentUser"],
    queryFn: AuthService.getCurrentUser,
    enabled: isLoggedIn, // 组件被挂载时，查询默认会自动执行，使用 enabled: isLoggedIn 可以在登录时自动执行
  });

  // 登录
  const loginMutation = useMutation<LoginResponse, AxiosError, LoginRequest>({
    mutationFn: (data: LoginRequest) => AuthService.login(data),
    onSuccess: (data: LoginResponse) => {
      localStorage.setItem("accessToken", data.access_token);
      queryClient.invalidateQueries({ queryKey: ["currentUser"] }); // 使当前用户信息失效以便重新获取
      refetchCurrentUser(); // 手动重新获取当前用户信息
      navigate("/", { replace: true }); // 登录成功后跳转到主页
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

  // 登出
  const logout = () => {
    localStorage.removeItem("accessToken");
    queryClient.setQueryData(["currentUser"], null);
    navigate("/login", { replace: true });
  };

  return { authError, currentUser, login, isLoggedIn, logout };
};
