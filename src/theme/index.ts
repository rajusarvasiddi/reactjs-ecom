import { createTheme } from "@mui/material/styles";
import { Link as RouterLink } from "react-router-dom";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#111111", // black text/buttons
      contrastText: "#ffffff",
    },
    background: {
      default: "#ffffff", // page background
      paper: "#ffffff", // AppBar & Paper background
    },
    text: {
      primary: "#111111",
      secondary: "#444444",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h6: {
      fontSize: "1.25rem", // Header title font-size
      fontWeight: 600,
    },
    body1: {
      fontSize: "0.9rem", // regular text
    },
    button: {
      fontSize: "0.95rem", // buttons font-size
      textTransform: "none", // keep normal case
    },
  },
  components: {
    MuiToolbar: {
      styleOverrides: {
        root: {
          borderBottom: "1px solid #e0e0e0",
        },
      },
    },
    MuiLink: {
      defaultProps: {
        component: RouterLink, // automatically use react-router-dom Link
      },
      styleOverrides: {
        root: {
          color: "#111",
          textDecoration: "none",
          padding: "6px 12px",
          borderRadius: "5px",
          fontWeight: 500,
          transition: "background-color 0.2s",
          "&:hover": { backgroundColor: "#f5f5f5" },
          "&.active": {
            backgroundColor: "#111",
            color: "#fff",
            "&:hover": { backgroundColor: "#000" },
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#ffffff", // make all AppBars white by default
          boxShadow: "none",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none", // keep normal case
        },
        containedPrimary: {
          backgroundColor: "#111111", // black background
          color: "#ffffff", // white text
          "&:hover": {
            backgroundColor: "#000000",
          },
        },
        text: {
          color: "#111111", // black text for text buttons (nav links)
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: "#111111", // default black text
        },
      },
    },
  },
});

export default theme;
