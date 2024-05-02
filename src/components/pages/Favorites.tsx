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
            height: "100vh",
            flexDirection: "row",
          }}
        >
          <Box
            sx={{
              maxWidth: 500,
              minWidth: 300,
              paddingLeft: 50,
              marginRight: -20,
            }}
          >
            {" "}
            <Typography
              variant="h3"
              sx={{ textTransform: "uppercase", fontSize: 80 }}
              gutterBottom
            >
              Mark some Cards To create your own Playlist{" "}
            </Typography>
          </Box>

          <FavBox>
            <Typography variant="h4">
              <List>
                {favoriteFormDataList.map((formData, index) => (
                  <ListItem key={index}>
                    <Typography variant="h4">
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
      ;
    </>
  );
}
