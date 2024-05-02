// theme.tsx
import { createTheme } from '@mui/material/styles';

export const createCustomTheme = (darkMode: boolean) => {
  return createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: darkMode ? '#646bf3' : '#00FF00',
      },
      secondary: {
        main: darkMode ? '#00FF00' : '#646bf3',
      },
      background: {
        default: darkMode ? '#101113' : '#ffffff',
      },
      text: {
        primary: darkMode ? '#646bf3' : '#00FF00', 
      },
    },
  });
};
