import Typography from "@mui/material/Typography";
import { FavoriteCard } from "./Card";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { FavBox } from "../styled/styles";
import { Box } from "@mui/material";

interface Data {
  favDataList: FavoriteCard[];
}

export default function Favorites({ favDataList }: Data) {
  const favorites: FavoriteCard[] = JSON.parse(
    localStorage.getItem("favorites") || "[]"
  );

  const favoriteFormDataList = favorites.filter((favorite) =>
    favDataList.some(
      (formData) =>
        formData.name === favorite.name && formData.artist === favorite.artist
    )
  );

  return (
    <>
      {favoriteFormDataList.length > 0 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            minHeight: "100vh",
            padding: "0 20px", 
            marginTop: { xs: 12, md: 20 }, 
          }}
        >
          <Typography
            variant="h3"
            sx={{
              textTransform: "uppercase",
              fontSize: { xs: 32, md: 64 },
              textAlign: "center",
              marginBottom: 4, 
            }}
            gutterBottom
          >
            Mark some Cards To create your own Playlist
          </Typography>

          <FavBox
            sx={{
              maxWidth: { xs: 300, sm: 400 },
              minWidth: 200,
              marginTop: 4, 
            }}
          >
            <Typography variant="h6">
              <List>
                {favoriteFormDataList.map((formData, index) => (
                  <ListItem key={index}>
                    <Typography variant="body1">
                      {formData.artist} - {formData.name}&nbsp;
                      {formData.releasedOn}
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </Typography>
          </FavBox>
        </Box>
      )}
    </>
  );
}
