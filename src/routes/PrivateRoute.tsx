import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

interface PrivateRouteProps {
  children: ReactNode;
  isAuthenticated: boolean;
  allowedRoles?: string[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  children,
  isAuthenticated,
  allowedRoles,
}) => {
  const { role } = useSelector((state: RootState) => state.role);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && role && !allowedRoles.includes(role)) {
    return <Navigate to="/app/dashboard" state={{ error: "Access Denied: You do not have permission to view this page." }} replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
