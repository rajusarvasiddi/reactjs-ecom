import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Link as MuiLink,
  Button,
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

  const navLinks = [
    { label: "Garage Create", path: "/admin/garage-create" },
    { label: "Products", path: "/admin/products" },
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

          {/* Button-style link */}
          <Button
            component={NavLink}
            to="/admin/cart"
            variant={location === "/admin/cart" ? "contained" : "text"}
            color="primary"
          >
            Cart ({cartCount})
          </Button>

          <MuiLink component={NavLinkBehavior} to={"/login"}>
            Logout
          </MuiLink>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
