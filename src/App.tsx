import React, { useState, useEffect } from "react";
import AppRouter from "./AppRouter";
import { MaterialUISwitch } from "./components/styled/Switch";
import { ThemeProvider } from "@mui/material";
import { createCustomTheme } from "./theme/theme";
import { GlobalStyle } from "./components/styled/styles";
import { Box, IconButton } from "@mui/material";
import { LanguageProvider, useLanguage } from "./components/LanguageContext"; 

import uaFlag from './img/ua.png';
import enFlag from './img/en.png';

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const { language, toggleLanguage } = useLanguage();

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
          top: "2px",
          right: "20px",
          zIndex: 2,
          padding: "10px",
          display: "flex",
          alignItems: "center",
          gap: "10px"
        }}
      >
        <IconButton
          onClick={toggleLanguage} 
          aria-label="toggle language"
          sx={{ marginTop: '5px' }}  
        >
          <img src={language === 'en' ? enFlag : uaFlag} alt="language flag" style={{ width: '35px', height: '35px' }} />
        </IconButton>
        <MaterialUISwitch
          checked={darkMode}
          onChange={handleToggleDarkMode}
          inputProps={{ "aria-label": "toggle dark mode" }}
          color="secondary"
          sx={{ marginTop: "5px" }}
        />
      </Box>
      <AppRouter />
    </ThemeProvider>
  );
};

const Root: React.FC = () => {
  return (
    <LanguageProvider>
      <App />
    </LanguageProvider>
  );
};

export default Root;
