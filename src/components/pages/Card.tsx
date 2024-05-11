import { FormData } from "./music";
import { Typography, Box, useTheme } from "@mui/material";
import { FormDataUser } from "./user";
import { CardBox, StyledDivider } from "../styled/styles";
import { waveform } from "ldrs";
import { useEffect, useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SyncIcon from "@mui/icons-material/Sync";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
waveform.register();

export interface FavoriteCard {
  name: string;
  artist: string;
  releasedOn: string;
}

export interface Props {
  data: FormData;
  dataUser: FormDataUser;
  onDelete: () => void;
}

export default function Card({ data, dataUser, onDelete }: Props) {
  const theme = useTheme();
  const colorAnimation = theme.palette.mode === "dark" ? "#ffffff" : "#000000";
  const [isFlipped, setIsFlipped] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites: FavoriteCard[] = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    setIsFavorite(favorites.some((favorite) => favorite.name === data.name));
  }, [data.name]);

  const toggleFavorite = () => {
    const favorites: FavoriteCard[] = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    const isCurrentlyFavorite = favorites.some(
      (favorite) => favorite.name === data.name
    );
    const newFavorites = isCurrentlyFavorite
      ? favorites.filter((item) => item.name !== data.name)
      : [...favorites, data];
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
    setIsFavorite(!isCurrentlyFavorite);
  };
  
  const handleToggleFavorite = () => {
    toggleFavorite();
  };
  const handleCardFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        marginTop: 30,
      }}
    >
      <CardBox style={{ transform: isFlipped ? "rotateY(180deg)" : "none" }}>
        <Box
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            display: "flex",
            textAlign: "center",
            alignItems: "center",
            flexDirection: "column",
            backfaceVisibility: "hidden",
            marginTop: { lg: 6, xs: 12 },
          }}
        >
          <Box>
            <l-waveform
              size="35"
              stroke="3.5"
              speed="1"
              color={colorAnimation}
            ></l-waveform>
          </Box>

          <Typography variant="h4" gutterBottom>
            Name of the song:
          </Typography>
          <Typography variant="h6" gutterBottom>
            {data?.name}
          </Typography>
          <Typography variant="h4" gutterBottom>
            Genre:
          </Typography>
          <Typography variant="h6" gutterBottom>
            {data?.genre}
          </Typography>
          <Typography variant="h4" gutterBottom>
            Artist:
          </Typography>
          <Typography variant="h6" gutterBottom>
            {data?.artist}
          </Typography>
          <Typography variant="h4" gutterBottom>
            Date for note:
          </Typography>
          <Typography variant="h6" gutterBottom>
            {data?.releasedOn}
          </Typography>
          <StyledDivider>
            <Typography variant="h6">{dataUser?.name}</Typography>
          </StyledDivider>
        </Box>

        <Box
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            display: "flex",
            textAlign: "center",
            alignItems: "center",
            flexDirection: "column",
            backfaceVisibility: "hidden",
            marginTop: { lg: 6, xs: 12 },
            transform: "rotateY(180deg)",
          }}
        >
          <Box>
            <l-waveform
              size="35"
              stroke="3.5"
              speed="1"
              color={colorAnimation}
            ></l-waveform>
          </Box>
          <Typography variant="h4" gutterBottom>
            User:
          </Typography>
          <Typography variant="h6" gutterBottom>
            {dataUser?.name}
          </Typography>
          <Typography variant="h4" gutterBottom>
            Age:
          </Typography>
          <Typography variant="h6" gutterBottom>
            {dataUser?.age}
          </Typography>
          <Typography variant="h4" gutterBottom>
            Mood:
          </Typography>
          <Typography variant="h6" gutterBottom>
            {dataUser?.mood}
          </Typography>
          <Typography variant="h4" gutterBottom>
            Preferred genres:
          </Typography>
          <Typography variant="h6" gutterBottom>
            {dataUser?.genres}
          </Typography>
          <StyledDivider>
            <Typography variant="h6">{data?.name}</Typography>
          </StyledDivider>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginTop: -4,
          }}
        >
          <FavoriteIcon
            onClick={handleToggleFavorite}
            sx={{
              width: 70,
              height: 70,
              cursor: "pointer",
              color: isFavorite
                ? colorAnimation === "#ffffff"
                  ? "#FF0000"
                  : "#FC2424"
                : "rgb(191, 81, 81)",
            }}
          />
          <SyncIcon
            onClick={handleCardFlip}
            sx={{ width: 60, height: 60, cursor: "pointer" }}
          />
          <DeleteOutlineIcon
            onClick={onDelete}
            sx={{ width: 60, height: 60, cursor: "pointer" }}
          />
        </Box>
      </CardBox>
    </Box>
  );
}
