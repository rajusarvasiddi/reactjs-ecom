import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        position: "sticky",
        bottom: 0,
        width: "100%",
        textAlign: "center",
        py: 1,
        borderTop: "1px solid #e0e0e0",
        backgroundColor: "#fff",
        zIndex: 1000,
      }}
    >
      <Typography variant="body2" color="text.secondary">
        &copy; 2025 GMS
      </Typography>
    </Box>
  );
};

export default Footer;
