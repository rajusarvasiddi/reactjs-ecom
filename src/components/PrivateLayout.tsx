import Header from "./Header";
import Footer from "./Footer";
import { Outlet, NavLink } from "react-router-dom";
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";

const drawerWidth = 220;

const navItems = [
  { label: "Dashboard", path: "/app/dashboard" },
  { label: "Garage Create", path: "/app/garage-create" },
  { label: "Products", path: "/app/products" },
  { label: "Cart", path: "/app/cart" },
];

const PrivateLayout = () => {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh", flexDirection: "column" }}>
      <Header />

      <Box sx={{ display: "flex", flexGrow: 1 }}>
        {/* Sidebar */}
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
              paddingTop: "1rem",
              borderRight: "none",
              backgroundColor: "#ffffff",
            },
          }}
        >
          <Toolbar>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, px: 2 }}>
              <img
                src="/logo192.png"
                alt="GMS Logo"
                style={{ width: 30, height: 30, objectFit: "contain" }}
              />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                GMS
              </Typography>
            </Box>
          </Toolbar>

          <Box sx={{ px: 1.5, pt: 1 }}>
            <Typography
              variant="caption"
              sx={{ px: 2, pb: 1, color: "custom.lightGray" }}
            >
              Getting Started
            </Typography>
            <List>
              {navItems.map((item) => (
                <ListItem key={item.path} disablePadding>
                  <Box sx={{ width: "100%" }}>
                    <NavLink to={item.path} style={{ textDecoration: "none" }}>
                      {({ isActive }) => (
                        <ListItemButton selected={isActive}>
                          <ListItemText primary={item.label} />
                        </ListItemButton>
                      )}
                    </NavLink>
                  </Box>
                </ListItem>
              ))}
            </List>
            <Divider sx={{ my: 1.5 }} />
            <Typography
              variant="caption"
              sx={{ px: 2, pb: 1, color: "text.secondary" }}
            >
              Shop
            </Typography>
            <List>
              {[
                { label: "Products", path: "/app/products" },
                { label: "Cart", path: "/app/cart" },
              ].map((item) => (
                <ListItem key={item.path} disablePadding>
                  <Box sx={{ width: "100%" }}>
                    <NavLink to={item.path} style={{ textDecoration: "none" }}>
                      {({ isActive }) => (
                        <ListItemButton selected={isActive}>
                          <ListItemText primary={item.label} />
                        </ListItemButton>
                      )}
                    </NavLink>
                  </Box>
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>

        {/* Main content */}
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Outlet />
        </Box>
      </Box>

      <Footer />
    </Box>
  );
};

export default PrivateLayout;
