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
      >
        {translations.playlist.header}
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        <Grid
          item
          xs={12}
          md={4}
          sx={{
            border: "3px solid #ccc",
            borderRadius: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            overflow: "hidden",
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
          xs={12}
          md={5}
          sx={{
            border: "3px solid #ccc",
            borderRadius: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            overflow: "hidden",
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
