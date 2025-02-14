import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  cssVariables: true,
  palette: {
    primary: { main: "#FFF" },
    secondary: { main: "#FFC107" },
    background: { default: "#000", paper: "#1B1F23" },
  },
  breakpoints: {
    values: {
      xs: 300,
      sm: 600,
      md: 768,
      lg: 992,
      xl: 1200,
    },
  },
  typography: {
    h1: { fontSize: "3rem" },
    h2: { fontSize: "2rem" },
  },
});

export default theme;
