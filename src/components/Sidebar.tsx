// src/components/Sidebar.tsx
import React from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  useTheme,
  useMediaQuery,
  Divider,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { closeSidebar } from "../store/uiSlice";
import { NavLink } from "react-router-dom";
import { WORDS } from "../constants"; // ✅ keep your constant reference

const drawerWidth = 220;

// ✅ Your original navItems structure
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
      { label: "Mechanic List", path: "/admin/mechanics" },
      { label: "Job Cards", path: "/admin/job-cards" },
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

const Sidebar: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const dispatch = useDispatch();
  const mobileOpen = useSelector((state: RootState) => state.ui.sidebarOpen);

  const drawerContent = (
    <Box>
      <Toolbar
        sx={{ minHeight: 64, display: "flex", alignItems: "center", px: 2 }}
      >
        <img
          src="/logo192.png"
          alt="GMS Logo"
          style={{ width: 30, height: 30 }}
        />
        <Typography variant="h6" sx={{ fontWeight: 600, ml: 1 }}>
          GMS
        </Typography>
      </Toolbar>

      <Box sx={{ px: 1.5, pt: 1 }}>
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
                  <NavLink
                    to={item.path}
                    style={{ textDecoration: "none", width: "100%" }}
                    onClick={() => {
                      if (isMobile) {
                        dispatch(closeSidebar());
                      }
                    }}
                  >
                    {({ isActive }) => (
                      <ListItemButton selected={isActive}>
                        <ListItemText primary={item.label} />
                      </ListItemButton>
                    )}
                  </NavLink>
                </ListItem>
              ))}
            </List>
          </Box>
        ))}
        {/* {navItems.map((section, idx) => (
          <Box key={idx}>
            {section.section && (
              <Typography
                variant="subtitle2"
                sx={{
                  px: 2,
                  mt: 1.5,
                  mb: 0.5,
                  color: "text.secondary",
                  fontWeight: 600,
                }}
              >
                {section.section}
              </Typography>
            )}
            <List disablePadding>
              {section.items.map((item) => (
                <ListItem key={item.path} disablePadding>
                  <NavLink
                    to={item.path}
                    style={{ textDecoration: "none", width: "100%" }}
                    onClick={() => {
                      if (isMobile) dispatch(closeSidebar());
                    }}
                  >
                    {({ isActive }) => (
                      <ListItemButton selected={isActive}>
                        <ListItemText
                          primary={item.label}
                          primaryTypographyProps={{ fontSize: 14 }}
                        />
                      </ListItemButton>
                    )}
                  </NavLink>
                </ListItem>
              ))}
            </List>
            {idx < navItems.length - 1 && <Divider sx={{ my: 1 }} />}
          </Box>
        ))} */}
      </Box>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
    >
      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={() => dispatch(closeSidebar())}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { width: drawerWidth },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Desktop Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": { width: drawerWidth, boxSizing: "border-box" },
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
};

export default Sidebar;
