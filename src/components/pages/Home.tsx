import { Box, Typography, Modal, IconButton, Tooltip, useTheme, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Timeline from "./Timeline";
import violet from "../../img/violet.svg";
import green from "../../img/green.svg";
import { useLanguage } from "../LanguageContext";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CloseIcon from "@mui/icons-material/Close";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { useThemeCustom } from "../../theme/ThemeContext";
import { useState } from "react";
import { routes } from "../Routes";

export default function Home() {
  const navigate = useNavigate();
  const theme = useTheme();
  const { darkMode } = useThemeCustom();
  const imagePath = darkMode ? violet : green;
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { translations } = useLanguage();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const redirectToContactForm = () => {
    navigate(routes.contact);
  };

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
              width: "100%",
              height: "auto",
              maxHeight: "50%",
            }}
          />
        </Box>
      </Box>

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            borderRadius: 3,
            textAlign: "center",
          }}
        >
          <IconButton
            sx={{ position: "absolute", top: 8, right: 8 }}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" gutterBottom>
            {translations.home.alert1}
          </Typography>
          <Typography variant="h6" gutterBottom>
            {translations.home.alert2}
          </Typography>
        </Box>
      </Modal>

      <Box sx={{ display: "flex", alignItems: "center", marginTop: 2 }}>
        <Tooltip title={translations.home.alerticon} arrow>
          <IconButton
            onClick={handleOpen}
            sx={{
              animation: 'pulse 1.5s infinite',
              '@keyframes pulse': {
                '0%': {
                  transform: 'scale(1)',
                  color: theme.palette.text.primary,
                },
                '50%': {
                  transform: 'scale(1.2)',
                  color: theme.palette.primary.main,
                },
                '100%': {
                  transform: 'scale(1)',
                  color: theme.palette.text.primary,
                },
              },
            }}
          >
            <ErrorOutlineIcon sx={{ width: 30, height: 30 }} />
          </IconButton>
        </Tooltip>
        <Tooltip title={translations.home.emailicon} arrow>
          <IconButton
            onClick={redirectToContactForm}
            sx={{
              animation: 'pulse 1.5s infinite',
              '@keyframes pulse': {
                '0%': {
                  transform: 'scale(1)',
                  color: theme.palette.text.primary,
                },
                '50%': {
                  transform: 'scale(1.2)',
                  color: theme.palette.secondary.main,
                },
                '100%': {
                  transform: 'scale(1)',
                  color: theme.palette.text.primary,
                },
              },
            }}
          >
            <MailOutlineIcon sx={{ width: 30, height: 30 }} />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
}

function OutlinedTimeline() {
  return (
    <Box>
      <Timeline />
    </Box>
  );
}
