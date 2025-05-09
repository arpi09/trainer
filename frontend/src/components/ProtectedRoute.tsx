import React from "react";
import { Navigate } from "react-router-dom";
import { useUserRole } from "../hooks/useUserRole";

interface ProtectedRouteProps {
  allowedRoles: string[];
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles, children }) => {
  const { role, loading } = useUserRole();

  if (loading) return <div>Loading...</div>;
  if (!role) return <Navigate to="/login" replace />;
  if (!allowedRoles.includes(role)) return <div>Unauthorized</div>;

  return <>{children}</>;
};

export default ProtectedRoute; 