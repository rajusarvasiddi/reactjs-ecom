import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import { Outlet, useLocation } from "react-router-dom";
import { Box, Snackbar, Alert } from "@mui/material";
import { useState, useEffect } from "react";

const PrivateLayout = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (location.state?.error) {
      setMessage(location.state.error);
      setOpen(true);
      // Clear state to prevent showing toast again on refresh (optional, but good practice)
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />

      <Box sx={{ display: "flex", flex: 1 }}>
        <Sidebar />

        <Box
          component="main"
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Outlet />
          </Box>
        </Box>
      </Box>

      <Footer />
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default PrivateLayout;
