import { Box, Divider, Grid, Typography } from "@mui/material";
import UsersBox from "./UsersBox";
import Songs from "./Songs";
import { useLanguage } from "../LanguageContext";

export default function Playlist() {
  const { translations } = useLanguage();
  return (
    <Box sx={{}}>
      <Typography
        variant="h4"
        sx={{
          textTransform: "uppercase",
          textAlign: "center",
          marginTop: 15,
          marginBottom: 6,
        }}
        gutterBottom
      >
        {translations.playlist.header}
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        <Grid
          item
          sx={{
            border: "3px solid #ccc",
            borderRadius: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography sx={{ fontSize: 30 }}>
            {translations.playlist.users}
          </Typography>
          <UsersBox />
        </Grid>
        <Divider
          orientation="vertical"
          variant="middle"
          flexItem
          sx={{ marginLeft: 5 }}
        />
        <Grid
          item
          sx={{
            border: "3px solid #ccc",
            borderRadius: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography sx={{ fontSize: 30 }}>
            {translations.playlist.songs}
          </Typography>
          <Songs />
        </Grid>
      </Grid>
    </Box>
  );
}
