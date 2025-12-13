import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { WORDS } from "../constants";
import { RootState } from "../store/store";
import { closeSidebar } from "../store/sidebarSlice";

const drawerWidth = 220;

const navItems = [
  {
    items: [{ label: "Dashboard", path: "/app/dashboard" }],
    roles: ["admin", "editor", "viewer"],
  },
  {
    section: "admin",
    roles: ["admin"],
    items: [
      { label: "Create User", path: "/app/create-user" },
      { label: "Garage Create", path: "/app/garage-create" },
      { label: `${WORDS.pages.garages} List`, path: "/app/garage-list" },
      { label: "Mechanic Create", path: "/app/mechanic-create" },
      { label: "Mechanic List", path: "/app/mechanics" },
      { label: "Cart", path: "/app/cart" },
      { label: "Inventory", path: "/app/products" },
    ],
  },
  {
    section: "editor",
    roles: ["editor"],
    items: [
      { label: "Garage Create", path: "/app/garage-create" },
      { label: "Mechanic Create", path: "/app/mechanic-create" },
      { label: "Mechanic List", path: "/app/mechanics" },
      { label: "Create Job Card", path: "/app/create-job-cards" },
      { label: "Job Cards", path: "/app/job-cards" },
      { label: "Invoices", path: "/app/invoices" },
    ],
  },
  {
    section: "viewer",
    roles: ["viewer"],
    items: [
      { label: "Job Cards", path: "/app/job-cards" },
      { label: "Request Service", path: "/app/create-service-request" },
      { label: "Service History", path: "/app/service-history" },
      { label: "Add Vehicle", path: "/app/add-vehicle" },
    ],
  },
];

const Sidebar: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const dispatch = useDispatch();
  const mobileOpen = useSelector(
    (state: RootState) => state.sidebar.sidebarOpen
  );
  const role = useSelector((state: RootState) => state.role.role);

  const filteredNavItems = navItems.filter((group) =>
    group.roles ? group.roles.includes(role || "") : true
  );

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
        {filteredNavItems.map((group, index) => (
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
