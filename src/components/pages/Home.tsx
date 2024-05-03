import { Box, Typography, useTheme } from "@mui/material";
import violet from "../../img/violet.svg";
import green from "../../img/green.svg";

export default function Home() {
  const theme = useTheme();
  const imagePath = theme.palette.mode === "dark" ? violet : green;

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100%",
          flexDirection: "row",
        }}
      >
        <Box
          sx={{
            width: 300,

            marginRight: 10,
          }}
        >
          <Typography
            variant="h3"
            sx={{ textTransform: "uppercase", fontSize: 100 }}
            gutterBottom
          >
            Your Day, Your Choice, Your Music
          </Typography>
        </Box>
        <img
          src={imagePath}
          alt="theme image"
          style={{ width: 700, height: 700 }}
        />
      </Box>
    </Box>
  );
}
