import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Link as MuiLink,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import {
  NavLink,
  Outlet,
  LinkProps as RouterLinkProps,
} from "react-router-dom";
const NavLinkBehavior = React.forwardRef<HTMLAnchorElement, RouterLinkProps>(
  (props, ref) => <NavLink ref={ref} {...props} />
);

const PublicLayout = () => {
  const navLinks = [
    { label: "Home", path: "/" },
    { label: "About", path: "about" },
    { label: "Contact", path: "contact" },
    { label: "Login", path: "login" },
  ];

  return (
    <>
      <AppBar position="sticky">
        <Toolbar
          sx={{ display: "flex", justifyContent: "space-between" }}
          className="toolbarBorder"
        >
          <Link
            to={"/"}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              textDecoration: "none",
              color: "inherit",
            }}
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
          </Link>
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            {/* Regular links using MuiLink */}
            {navLinks.map((item) => (
              <MuiLink
                key={item.path}
                component={NavLinkBehavior}
                to={item.path}
              >
                {item.label}
              </MuiLink>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Outlet />
    </>
  );
};

export default PublicLayout;
