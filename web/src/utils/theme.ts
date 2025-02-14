import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  cssVariables: true,
  palette: {
    primary: { main: "#FFF" },
    secondary: { main: "#FFC107" },
    background: { default: "#000", paper: "#1B1F23" },
  },
});

export default theme;
