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
  {
    items: [{ label: "Dashboard", path: "/app/dashboard" }],
  },
  {
    section: "Garage",
    items: [
      { label: "Garage Create", path: "/app/garage-create" },
      { label: "Products", path: "/app/products" },
      { label: "Cart", path: "/app/cart" },
    ],
  },
  {
    section: "Admin",
    items: [
      { label: "Users", path: "/app/users" },
      { label: "Settings", path: "/app/settings" },
    ],
  },
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
            <List>
              {navItems.map((group, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  {group.section && (
                    <Typography
                      variant="caption"
                      sx={{ px: 2, pb: 1, color: "custom.lightGray" }}
                    >
                      {group.section}
                    </Typography>
                  )}

                  <List>
                    {group.items.map((item) => (
                      <ListItem key={item.path} disablePadding>
                        <Box sx={{ width: "100%" }}>
                          <NavLink
                            to={item.path}
                            style={{ textDecoration: "none" }}
                          >
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

                  {index < navItems.length - 1 && <Divider sx={{ my: 1.5 }} />}
                </Box>
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
