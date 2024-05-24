import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import violet from "../../img/error_violet.svg";
import green from "../../img/error_green.svg";
import { useThemeCustom } from "../../theme/ThemeContext";
import { useLanguage } from "../LanguageContext";


const NotFound: React.FC = () => {
const { translations } = useLanguage();
  const { darkMode } = useThemeCustom();
  const theme = useTheme();
  const imagePath = darkMode ? violet : green;
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100%",
          flexDirection: isMobile ? "column" : "row",
        }}
      >
        <Box
          sx={{
            width: isMobile ? "100%" : 600,
            height: isMobile ? "auto" : 600,
            display: "flex",
            flexDirection: "column",
            marginRight: 0,
            alignItems: isMobile ? "center" : "flex-start",
            textAlign: isMobile ? "center" : "left",
          }}
        >
          <Typography
            variant={isMobile ? "h4" : "h3"}
            sx={{
              textTransform: "uppercase",
              fontSize: isMobile ? 50 : 100,
              marginBottom: isMobile ? 2 : "inherit",
            }}
          >
            {translations.notFound.title}
          </Typography>
          <Typography
            variant={isMobile ? "h4" : "h3"}
            sx={{
              textTransform: "uppercase",
              fontSize: isMobile ? 30 : 80,
              marginBottom: isMobile ? 2 : "inherit",
            }}
          >
            {translations.notFound.message}
          </Typography>
        </Box>
        <img
          src={imagePath}
          alt="theme image"
          style={{
            width: isMobile ? 400 : 700,
            height: isMobile ? 400 : 700,
            marginRight: isMobile ? 50 : 0,
          }}
        />
      </Box>
    </Box>
  );
};

export default NotFound;
