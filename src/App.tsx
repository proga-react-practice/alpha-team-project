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
          position: "absolute",
          top: 0,
          right: 0,
          marginRight: 5,
          marginTop: 3,
          zIndex: 2,
        }}
      >
        <MaterialUISwitch
          checked={darkMode}
          onChange={handleToggleDarkMode}
          inputProps={{ "aria-label": "toggle dark mode" }}
          color="secondary"
          sx={{ mr: 1 }}
        />
      </Box>
      <AppRouter />
    </ThemeProvider>
  );
};

export default App;
