import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import qs from "qs";

// 定义登录请求的类型
export interface LoginRequest {
  username: string;
  password: string;
}

// 定义登录响应的类型
interface LoginResponse {
  access_token: string;
}

// 创建一个自定义钩子，用于处理用户登录和登出
export const useAuth = () => {
  const queryClient = useQueryClient();

  // 定义登录的 mutation
  const loginMutation = useMutation(
    async (data: LoginRequest) => {
      const response = await axios.post<LoginResponse>(
        "http://localhost:8000/auth/token",
        // qs 用于将 JS 对象转换为 URL 查询字符串格式
        qs.stringify({
          grant_type: "password",
          username: data.username,
          password: data.password,
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      return response.data;
    },
    {
      onSuccess: (data) => {
        // 将 token 存储在本地存储中
        localStorage.setItem("token", data.access_token);
        // 可以在这里触发任何其他的状态更新或导航逻辑
        console.log("登录成功");
      },
      onError: (error) => {
        // 处理登录错误
        console.error("登录失败", error);
      },
    }
  );

  // 定义登出的函数
  const logout = () => {
    localStorage.removeItem("token");
    queryClient.clear();
    console.log("登出成功");
  };

  return {
    login: loginMutation.mutate,
    logout,
  };
};
