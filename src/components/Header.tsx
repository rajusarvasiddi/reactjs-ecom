import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Link as MuiLink,
  Button,
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { NavLink, LinkProps as RouterLinkProps } from "react-router-dom";

// TypeScript-safe NavLink for MuiLink
const NavLinkBehavior = React.forwardRef<HTMLAnchorElement, RouterLinkProps>(
  (props, ref) => <NavLink ref={ref} {...props} />
);

const Header = () => {
  const cartCount = useSelector((state: RootState) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );
  const location = window.location.pathname;

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
          {/* Button-style link */}
          <Button
            component={NavLink}
            to="/admin/cart"
            variant={location === "/admin/cart" ? "contained" : "text"}
            color="primary"
          >
            Cart ({cartCount})
          </Button>
          {/* Role dropdown */}
          <FormControl
            variant="outlined"
            size="small"
            sx={{ minWidth: 120, background: "#FFFFFF", borderRadius: 1 }}
          >
            {/* <InputLabel id="role-select-label">Role</InputLabel> */}
            <Select
              labelId="role-select-label"
              value={role}
              onChange={handleRoleChange}
            >
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="garageOwner">Garage Owner</MenuItem>
              <MenuItem value="mechanic">Mechanic</MenuItem>
            </Select>
          </FormControl>
          <MuiLink component={NavLinkBehavior} to={"/login"}>
            Logout
          </MuiLink>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
