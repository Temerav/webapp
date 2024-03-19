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

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

function App() {
  const [mode, setMode] = React.useState("light");
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );
  return (
    <>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ResponsiveAppBar theme={theme} colorMode={colorMode} />
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/Welcome" element={<Welcome />} />
            <Route path="/Shop" element={<Shop />} />
            <Route path="/Work" element={<Work />} />
            <Route path="/About" element={<About />} />
            <Route path="/Contact" element={<Contact />} />
          </Routes>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
}

export default App;
