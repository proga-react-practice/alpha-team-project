import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Timeline from "./Timeline";
import violet from "../../img/violet.svg";
import green from "../../img/green.svg";
import { useLanguage } from "../LanguageContext";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useThemeCustom } from "../../theme/ThemeContext";
export default function Home() {
  const theme = useTheme();
  const { darkMode } = useThemeCustom();
  const imagePath = darkMode ? violet : green;
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { translations } = useLanguage();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Box sx={{ textAlign: "center", width: "80%", marginTop: 12 }}>
        <Typography variant="h4" sx={{ textTransform: "uppercase" }}>
          {translations.home.title}
        </Typography>
        <Typography variant="body1">{translations.home.description}</Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "90%",
          maxWidth: 1200,
        }}
      >
        {!isMobile && (
          <Box
            sx={{
              marginTop: "90px",
              width: "40%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <OutlinedTimeline />
          </Box>
        )}

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: isMobile ? "80%" : "60%",
          }}
        >
          <img
            src={imagePath}
            alt="theme image"
            style={{
              marginTop: isMobile ? "120px" : "100px",
              marginLeft: isMobile ? "7%" : "40%",
              width: isMobile ? "100%" : "100%",
              height: "auto",
              maxHeight: "50%",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}

function OutlinedTimeline() {
  const { translations } = useLanguage();
  return (
    <Box>
      <Timeline />
      <Box
        sx={{
          textAlign: "center",
          marginTop: 5,
          border: "3px solid #ccc",
          borderRadius: 3,
        }}
      >
        <ErrorOutlineIcon sx={{ width: 40, height: 40, marginTop: 1 }} />
        <Box sx={{ margin: 1 }}>
          <Typography variant="h6" gutterBottom>
            {translations.home.alert1}
          </Typography>
          <Typography variant="h6" gutterBottom>
            {" "}
            {translations.home.alert2}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
