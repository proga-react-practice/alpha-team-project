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
          height: "98vh",
          width: "90%",
          flexDirection: { xs: "column", md: "row" } as any,
        }}
      >
        <Box
          sx={{
            width: { xs: "90%", md: 300 } as any, 
            textAlign: "center",
            marginBottom: { xs: 4, md: 0 } as any, 
          }}
        >
          <Typography
            variant="h3"
            sx={{ textTransform: "uppercase", fontSize: { xs: 40, md: 70 } }} 
            gutterBottom
          >
            Your Day, Your Choice, Your Music
          </Typography>
        </Box>
        <img
          src={imagePath}
          alt="theme image"
          style={{
            width: { xs: "90%", md: 700 } as any, 
            height: "auto", 
            marginTop: { xs: 4, md: 0 } as any,
          }}
        />
      </Box>
    </Box>
  );
}
