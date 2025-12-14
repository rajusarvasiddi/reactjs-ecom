import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Box, Typography } from "@mui/material";

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
  const { user } = useSelector((state: RootState) => state.auth);
  const role = user?.role;

  const isUnauthorized = isAuthenticated && allowedRoles && role && !allowedRoles.includes(role);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (isUnauthorized) {
    // Show Access Denied message on the page
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "60vh",
          textAlign: "center",
          px: 3,
        }}
      >
        <Typography variant="h5" color="error" gutterBottom>
          Access Denied
        </Typography>
        <Typography variant="body1" color="text.secondary">
          You don't have permission to view this page.
        </Typography>
      </Box>
    );
  }

  return <>{children}</>;
};

export default PrivateRoute;
