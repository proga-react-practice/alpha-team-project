import { Box, Typography, useTheme } from "@mui/material";
import violet from "../../img/violet.svg";
import green from "../../img/green.svg";

export default function Home() {
  const theme = useTheme();
  const imagePath = theme.palette.mode === "dark" ? violet : green;

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: { xs: "column", md: "row" },
          width: "90%",
          maxWidth: 1200,
        }}
      >
        <Box
          sx={{
            textAlign: "center",
            paddingRight: { xs: 0, md: 4 },
            paddingBottom: { xs: 4, md: 0 },
            width: "60%"
          }}
        >
          <Typography
            variant="h4"
            sx={{ textTransform: "uppercase", fontSize: { xs: 32, md: 48 }, marginBottom: 2 }}
          >
            Your Day, Your Choice, Your Music
          </Typography>
          <Typography variant="body1" sx={{ fontSize: { xs: 14, md: 18 }, lineHeight: 1.6 }}>
            Welcome to our music selection platform! Customize your listening experience based on your preferences and mood. Explore curated playlists and discover new tracks that resonate with you.
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "70%"
          }}
        >
          <img
            src={imagePath}
            alt="theme image"
            style={{
              marginTop: "40px",
              width: "100%",
              height: "auto",
              maxHeight: "80vh",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}
