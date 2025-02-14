import { ThemeProvider } from "@mui/material/styles";

import Header from "./components/Header/Header";
import theme from "./utils/theme";

import "./App.css";
import UserProvider from "./context/UserContext";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
        <Header />
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
