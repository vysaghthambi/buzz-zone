import { ThemeProvider } from "@mui/material/styles";

import Header from "./components/Header/Header";
import theme from "./utils/theme";

import "./App.css";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Header />
    </ThemeProvider>
  );
}

export default App;
