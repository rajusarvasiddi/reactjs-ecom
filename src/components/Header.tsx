import { Logout, Menu as MenuIcon, PersonAdd } from "@mui/icons-material";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Divider,
  FormControl,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  NavLink,
  LinkProps as RouterLinkProps,
  useNavigate,
} from "react-router-dom";
import { toggleSidebar } from "../store/sidebarSlice";
import { RootState } from "../store/store";
import { setRole } from "store/roleSlice";
import { logout as logoutAction } from "../store/authSlice";
import { logout as logoutService } from "../services/authService";

// Type-safe NavLink for MuiLink-like usage
const NavLinkBehavior = React.forwardRef<HTMLAnchorElement, RouterLinkProps>(
  (props, ref) => <NavLink ref={ref} {...props} />
);

const Header: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (e: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleLogout = async () => {
    try {
      await logoutService();
    } catch (error) {
      // Continue with logout even if API call fails
      console.error("Logout error:", error);
    } finally {
      dispatch(logoutAction());
      navigate("/login");
    }
  };

  const cartCount = useSelector((state: RootState) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  // const [role, setRole] = useState("admin");

  const currentRole =
    useSelector((state: RootState) => state.role.role) || "admin";
  const handleRoleChange = (event: SelectChangeEvent) => {
    const selectedRole = event?.target?.value as
      | "admin"
      | "garageOwner"
      | "mechanic";
    dispatch(setRole(selectedRole));
  };
  // setRole(event.target.value as string);

  const navLinks: any[] = [
    // add if needed
  ];

  return (
    <AppBar position="sticky">
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Left: (mobile) hamburger + logo, (desktop) logo */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {isMobile && (
            <IconButton
              color="primary"
              edge="start"
              onClick={() => dispatch(toggleSidebar())}
            >
              <MenuIcon />
            </IconButton>
          )}
          <img
            src="/logo192.png"
            alt="GMS Logo"
            style={{
              width: isMobile ? 30 : 40,
              height: isMobile ? 30 : 40,
              objectFit: "contain",
            }}
          />
          <Typography
            variant="h6"
            sx={{ fontWeight: 600, fontSize: isMobile ? 16 : 20 }}
          >
            GMS
          </Typography>
        </Box>

        {/* Right: desktop items hidden on mobile except notifications + avatar */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {/* Nav Links (Desktop only) */}
          {navLinks.map((item) => (
            <Box key={item.path} sx={{ display: isMobile ? "none" : "block" }}>
              <NavLinkBehavior to={item.path}>{item.label}</NavLinkBehavior>
            </Box>
          ))}

          {/* Search (Desktop only) */}
          <TextField
            size="small"
            placeholder="Search..."
            autoComplete="off"
            sx={{
              display: isMobile ? "none" : "block",
              background: "#fff",
              borderRadius: 1,
              width: 200,
            }}
          />

          {/* Role (Desktop only) */}
          <FormControl
            variant="outlined"
            size="small"
            sx={{
              display: isMobile ? "none" : "flex",
              minWidth: 120,
              background: "#fff",
              borderRadius: 1,
            }}
          >
            <Select
              value={currentRole || ""}
              onChange={handleRoleChange}
              size="small"
            >
              <MenuItem value="" disabled>
                Select Role
              </MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="garageOwner">Garage Owner</MenuItem>
              <MenuItem value="mechanic">Mechanic</MenuItem>
            </Select>
          </FormControl>

          {/* Notifications (always visible) */}
          <Badge color="error" badgeContent={cartCount} sx={{ ml: 1 }}>
            <NotificationsActiveOutlinedIcon sx={{ color: "#000" }} />
          </Badge>

          {/* Avatar */}
          <Tooltip title="Account settings">
            <IconButton onClick={handleClick} size="small" sx={{ ml: 1 }}>
              <Avatar sx={{ width: 32, height: 32 }}>MK</Avatar>
            </IconButton>
          </Tooltip>

          {/* Account menu */}
          <Menu
            anchorEl={anchorEl}
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
            <MenuItem
              component={Link}
              to="/admin/my-account"
              onClick={handleClose}
            >
              <Avatar /> My Account
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <PersonAdd fontSize="small" />
              </ListItemIcon>
              Add Operator
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
