import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

const PrivateLayout = () => {
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
            p: 3,
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Outlet />
          </Box>
        </Box>
      </Box>

      <Footer />
    </Box>
  );
};

export default PrivateLayout;
