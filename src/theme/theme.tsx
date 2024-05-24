import { createTheme } from "@mui/material/styles";

export const createCustomTheme = (darkMode: boolean) => {
  return createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: darkMode ? "#646bf3" : "#6ee6ba",
      },
      secondary: {
        main: darkMode ? "#6ee6ba" : "#646bf3",
      },
      background: {
        default: darkMode ? "#101113" : "#f5f5dc",
      },
      text: {
        primary: darkMode ? "#646bf3" : "#333333",
      },
    },
    components: {
      MuiTypography: {
        defaultProps: {
          gutterBottom: true
        },
      },
    },
  });
};
