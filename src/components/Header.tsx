import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Link as MuiLink,
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
  TextField,
  Menu,
  Avatar,
  ListItemIcon,
  Divider,
  Tooltip,
  IconButton,
  Badge,
} from "@mui/material";
import {
  NavLink,
  LinkProps as RouterLinkProps,
  useNavigate,
} from "react-router-dom";
import { Logout, PersonAdd, Settings } from "@mui/icons-material";
import { Link } from "react-router-dom";

// TypeScript-safe NavLink for MuiLink
const NavLinkBehavior = React.forwardRef<HTMLAnchorElement, RouterLinkProps>(
  (props, ref) => <NavLink ref={ref} {...props} />
);

const Header = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    navigate("/login");
  };
  const cartCount = useSelector((state: RootState) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  const [role, setRole] = useState("admin");

  const handleRoleChange = (event: SelectChangeEvent) => {
    const selectedRole = event.target.value as string;
    setRole(selectedRole);
  };

  const navLinks: any[] = [
    // { label: "Garage Create", path: "/admin/garage-create" },
    // { label: "Products", path: "/admin/products" },
  ];

  return (
    <AppBar position="sticky">
      <Toolbar
        sx={{ display: "flex", justifyContent: "space-between" }}
        className="toolbarBorder"
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <img
            src="/logo192.png"
            alt="GMS Logo"
            style={{ width: 40, height: 40, objectFit: "contain" }}
          />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            GMS
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          {/* Regular links using MuiLink */}
          {navLinks.map((item) => (
            <MuiLink key={item.path} component={NavLinkBehavior} to={item.path}>
              {item.label}
            </MuiLink>
          ))}
          {/* Search bar */}
          <TextField
            size="small"
            variant="outlined"
            placeholder="Search..."
            sx={{ background: "#FFFFFF", borderRadius: 1 }}
            onChange={(e) => console.log("Search value:", e.target.value)}
          />
          {/* Create Job Card */}
          <MuiLink component={NavLinkBehavior} to={"/admin/job-cards"}>
            Create Job Card
          </MuiLink>

          <Badge color="error" badgeContent={cartCount} sx={{ ml: 2, mr: 2 }}>
            <NotificationsActiveOutlinedIcon sx={{ color: "#000" }} />
          </Badge>

          {/* Role dropdown */}
          <FormControl
            variant="outlined"
            size="small"
            sx={{ minWidth: 120, background: "#FFFFFF", borderRadius: 1 }}
          >
            <Select
              labelId="role-select-label"
              value={role}
              size="small"
              onChange={handleRoleChange}
            >
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="garageOwner">Garage Owner</MenuItem>
              <MenuItem value="mechanic">Mechanic</MenuItem>
            </Select>
          </FormControl>

          <Tooltip title="Account settings">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <Avatar sx={{ width: 32, height: 32 }}>MK</Avatar>
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            slotProps={{
              paper: {
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&::before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem onClick={handleClose}>
              <Avatar /> My Account
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <PersonAdd fontSize="small" />
              </ListItemIcon>
              Add Operator
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              Settings
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
