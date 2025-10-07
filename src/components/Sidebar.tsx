import { NavLink } from "react-router-dom";
import {
  Box,
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
    ],
  },
  {
    section: "Mechanic",
    items: [{ label: "Mechanic Create", path: "/app/mechanic-create" }],
  },
  {
    section: "Customers",
    items: [
      { label: "Create", path: "/app/customer-create" },
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

const Sidebar = () => {
  return (
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
      <Toolbar sx={{ minHeight: 64, display: "flex", alignItems: "center" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, px: 2 }}>
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
  );
};

export default Sidebar;
