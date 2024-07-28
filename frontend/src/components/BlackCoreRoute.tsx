import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const BlackCoreRoute = ({ children }: Props) => {
  const { currentUser } = useAuth();

  if (currentUser === undefined) <Navigate to="/login" replace />;
  else if (currentUser?.privilege < 3) {
    return;
  }

  return children;
};

export default BlackCoreRoute;
