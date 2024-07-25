import { ReactNode } from "react";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

interface Props {
  children: ReactNode;
}

const PrivateRoute = ({ children }: Props) => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    // replace 表示替代浏览记录，这样用户点击后退的时候会不会回到之前的页面
    return <Navigate to="/login" replace />;
  }

  // 只有经过身份验证才能访问的路由
  return children;
};

export default PrivateRoute;
