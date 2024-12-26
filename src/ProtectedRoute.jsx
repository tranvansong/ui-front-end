import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./context/client/AuthContext";

const ProtectedRoute = ({ children, roles = [] }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Kiểm tra quyền truy cập nếu roles được chỉ định
  if (roles.length > 0 && !roles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Nếu xác thực và phân quyền hợp lệ, hiển thị nội dung
  return children;
};

export default ProtectedRoute;
