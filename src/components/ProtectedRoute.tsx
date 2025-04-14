import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import AppHeader from "./AppHeader";
import SideBar from "./SideBar";
import Box from "@mui/material/Box";

interface ProtectedRouteProps {
  children: React.ReactNode;
  accessToken: string;
  intraId?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  accessToken,
  intraId = "",
}) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 세션 스토리지 비우기
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
    sessionStorage.removeItem("intraId");
    sessionStorage.removeItem("userId");

    // 로그인 페이지로 리다이렉트
    navigate("/");
  };

  if (!accessToken) {
    return <Navigate to="/" replace />;
  }

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f5f5f7" }}>
      <AppHeader intraId={intraId} onLogout={handleLogout} />
      <SideBar />
      {children}
    </Box>
  );
};

export default ProtectedRoute;
