import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { WORDS } from "../constants";

const drawerWidth = 220;

const navItems = [
  {
    items: [{ label: "Dashboard", path: "/admin/dashboard" }],
  },
  {
    section: "Garage",
    items: [
      { label: "Garage Create", path: "/admin/garage-create" },
      { label: `${WORDS.pages.garages} List`, path: "/admin/garage-list" },
      { label: "Products", path: "/admin/products" },
    ],
  },
  {
    section: "Mechanic",
    items: [
      { label: "Mechanic Create", path: "/admin/mechanic-create" },
      { label: " Mechanic List", path: "/admin/mechanics" },
      { label: " Job Cards", path: "/admin/job-cards" },
    ],
  },
  {
    section: "Customers",
    items: [
      { label: "Create", path: "/admin/customer-create" },
      { label: "Cart", path: "/admin/cart" },
    ],
  },
  {
    section: "Admin",
    items: [
      { label: "Users", path: "/admin/users" },
      { label: "Settings", path: "/admin/settings" },
    ],
  },
];

const Sidebar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        {/* Top AppBar */}
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
              backgroundColor: "#ffffff",
              borderRight: "1px solid #e0e0e0",
            },
          }}
        >
          <AppBar position="sticky">
            <Toolbar
              sx={{ minHeight: 64, display: "flex", alignItems: "center" }}
            >
              {isMobile && (
                <IconButton
                  color="primary"
                  edge="start"
                  onClick={handleDrawerToggle}
                  sx={{ mr: 2 }}
                >
                  <MenuIcon />
                </IconButton>
              )}

              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, px: 2 }}
              >
                <img
                  src="/logo192.png"
                  alt="GMS Logo"
                  style={{ width: 30, height: 30 }}
                />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  GMS
                </Typography>
              </Box>
            </Toolbar>
          </AppBar>

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
                  {/* {index < navItems.length - 1 && <Divider sx={{ my: 1.5 }} />} */}
                </Box>
              ))}
            </List>
          </Box>
        </Drawer>
      </Box>
    </>
  );
};

export default Sidebar;
