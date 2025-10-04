// src/components/PublicLayout.tsx
import { Outlet } from "react-router-dom";
import { Box, Typography } from "@mui/material";

const PublicLayout = () => {
  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Welcome to GMS
      </Typography>
      {/* You can add a public header, footer, or branding here */}
      <Outlet />
    </Box>
  );
};

export default PublicLayout;
