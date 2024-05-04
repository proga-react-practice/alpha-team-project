import React, { useState, useEffect } from "react";
import AppRouter from "./AppRouter";
import { MaterialUISwitch } from "./components/styled/Switch";
import { ThemeProvider } from "@mui/material";
import { createCustomTheme } from "./theme/theme";
import { GlobalStyle } from "./components/styled/styles";
import { Box } from "@mui/material";

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(true);

  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const theme = createCustomTheme(darkMode);

  useEffect(() => {
    document.body.style.backgroundColor = theme.palette.background.default;
    document.body.style.color = theme.palette.text.primary;
  }, [theme]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Box
  sx={{
    position: "fixed",
    top: "3px", 
    right: "20px",
    zIndex: 2,
    padding: "10px",
  }}
>
  <MaterialUISwitch
    checked={darkMode}
    onChange={handleToggleDarkMode}
    inputProps={{ "aria-label": "toggle dark mode" }}
    color="secondary"
    sx={{ marginTop: "10px" }}
  />
</Box>

      <AppRouter />
    </ThemeProvider>
  );
};

export default App;

