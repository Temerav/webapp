import { Route, Routes } from "react-router-dom";

import Shop from "./components/Shop/index.js";
import About from "./components/About/index.js";
import ResponsiveAppBar from "./components/ResponsiveAppBar/index.js";
import Welcome from "./components/Welcome/index.js";
import Work from "./components/Work/index.js";
import Contact from "./components/Contact/index.js";
import CssBaseline from "@mui/material/CssBaseline";
import * as React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import SpeedDialCustom from "./components/SpeedDialCustom/index.js";
import Login from "./components/Login/index.js";
import Signup from "./components/Signup/index.js";
import Dashboard from "./components/Dashboard/index.js";
import Cart from "./components/Cart/index.js";
import CartProvider from "./components/Cart/index.js";

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

function App() {
  const [mode, setMode] = React.useState(
    localStorage.getItem("mode") || "light",
  );

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
        localStorage.setItem("mode", mode === "light" ? "dark" : "light");
      },
    }),
    [mode],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "light"
            ? {}
            : {
                background: {
                  default: "#1D2125",
                },
              }),
        },
      }),
    [mode],
  );

  return (
    <div>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ResponsiveAppBar theme={theme} colorMode={colorMode} />
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/Welcome" element={<Welcome />} />
            <Route path="/Shop" element={<Shop />} />
            <Route path="/Cart" element={<Cart />} />
            <Route path="/Work" element={<Work />} />
            <Route path="/About" element={<About />} />
            <Route path="/Contact" element={<Contact />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/Dashboard" element={<Dashboard />} />
          </Routes>
          <SpeedDialCustom />
        </ThemeProvider>
      </ColorModeContext.Provider>
    </div>
  );
}

export default App;
