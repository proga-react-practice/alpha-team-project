import { Box, Typography, useTheme } from "@mui/material";
import React from "react";
import violet from "../../img/error_violet.svg";
import green from "../../img/error_green.svg";

const NotFound: React.FC = () => {
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
            width: 600,
            height: 600,
            display: "flex",
            flexDirection: "column",
            marginRight: 0,
          }}
        >
          <Typography
            variant="h3"
            sx={{ textTransform: "uppercase", fontSize: 100 }}
            gutterBottom
          >
            404 - Not Found
          </Typography>
          <Typography
            variant="h3"
            sx={{ textTransform: "uppercase", fontSize: 80 }}
            gutterBottom
          >
            The page you are looking for does not exist.
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
};

export default NotFound;
