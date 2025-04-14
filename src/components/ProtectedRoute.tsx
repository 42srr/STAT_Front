import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
  accessToken: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  accessToken,
}) => {
  if (!accessToken) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;
