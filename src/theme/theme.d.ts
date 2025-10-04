import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    custom: {
      lightGray: string;
    };
  }
  interface PaletteOptions {
    custom?: {
      lightGray?: string;
    };
  }
}
