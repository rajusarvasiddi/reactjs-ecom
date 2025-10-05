// Custom styling material UI - look like shadCN

import { createTheme } from "@mui/material/styles";
import { Link as RouterLink } from "react-router-dom";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#111111",
      contrastText: "#ffffff",
    },
    background: {
      default: "#ffffff",
      paper: "#ffffff",
    },
    text: {
      primary: "#111111",
      secondary: "#444444",
    },
    custom: {
      lightGray: "#c3b9b9",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h4: {
      fontSize: "1.75rem",
      fontWeight: 700,
      lineHeight: 1.3,
    },
    h6: {
      fontSize: "1.25rem",
      fontWeight: 600,
    },
    body1: {
      fontSize: "0.85rem",
    },
    button: {
      fontSize: "0.95rem",
      textTransform: "none",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#ffffff",
          color: "#111111",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#c9c7c7",
          "&.Mui-focused": {
            color: "#000000",
            "& .MuiInputLabel-asterisk": {
              color: "#ff1744",
            },
          },
        },
        asterisk: {
          color: "#c9c7c7",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#ffffff",
          boxShadow: "none",
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          borderBottom: "1px solid #e0e0e0",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: "none",
          backgroundColor: "#ffffff",
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          paddingTop: 0,
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          paddingTop: 0,
          paddingBottom: 0,
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: "5px",
          margin: "1px 6px",
          padding: "2px 12px",
          minHeight: "28px",
          transition: "background-color 0.2s ease-in-out",
          color: "#111111",
          "&:hover": {
            backgroundColor: "#f5f5f5",
          },
          "&.Mui-selected": {
            backgroundColor: "#f0f0f0",
            color: "#111111",
            "& .MuiListItemText-root": {
              fontWeight: 600,
            },
          },
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        root: {
          fontSize: "0.875rem",
        },
      },
    },
    MuiLink: {
      defaultProps: {
        component: RouterLink,
      },
      styleOverrides: {
        root: {
          color: "#111111",
          textDecoration: "none",
          padding: "6px 12px",
          borderRadius: "5px",
          fontWeight: 500,
          transition: "background-color 0.2s",
          "&:hover": {
            backgroundColor: "#f5f5f5",
          },
          "&.active": {
            backgroundColor: "#111111",
            color: "#ffffff",
            "&:hover": {
              backgroundColor: "#000000",
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
        containedPrimary: {
          backgroundColor: "#111111",
          color: "#ffffff",
          "&:hover": {
            backgroundColor: "#000000",
          },
        },
        outlinedSecondary: {
          border: "1px solid #e0e0e0",
          backgroundColor: "#ffffff",
          color: "#111111",
          "&:hover": {
            backgroundColor: "#f9f9f9",
            borderColor: "#d0d0d0",
          },
        },
        text: {
          color: "#111111",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: "#111111",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          "&::placeholder": {
            color: "#f0ebeb",
            opacity: 1,
          },
        },
      },
    },
  },
});

export default theme;
