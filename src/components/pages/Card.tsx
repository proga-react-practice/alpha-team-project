import { FormData } from "./music";
import {
  Typography,
  Box,
  useTheme,
  TextField,
  MenuItem,
  Select,
} from "@mui/material";
import { FormDataUser } from "./user";
import { CardBox, StyledDivider } from "../styled/styles";
import { waveform } from "ldrs";
import { useEffect, useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SyncIcon from "@mui/icons-material/Sync";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { SelectChangeEvent } from "@mui/material/Select";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import ClearIcon from "@mui/icons-material/Clear";
import { useLanguage } from "../LanguageContext";
waveform.register();

export interface FavoriteCard {
  id: string;
  name: string;
  artist: string;
  releasedOn: string;
}

export interface Props {
  data: FormData;
  dataUser: FormDataUser;
  onDelete: () => void;
  cardId: string;
}

enum Genre {
  Funk = "Funk",
  Rock = "Rock",
  Metal = "Metal",
  Jazz = "Jazz",
  Pop = "Pop",
  HipHopRap = "Hip-hop/Rap",
  ElectronicDance = "Electronic/Dance",
  RnBSoul = "R&B/Soul",
  Classical = "Classical",
  Country = "Country",
  Alternative = "Alternative",
  Indie = "Indie",
}

enum Mood {
  Happy = "Happy",
  Sad = "Sad",
  Energetic = "Energetic",
  Relaxing = "Relaxing",
  Chill = "Chill",
  PumpUp = "Pump-up",
}

export default function Card({ data, dataUser, onDelete, cardId }: Props) {
  const { translations } = useLanguage();
  const theme = useTheme();
  const colorAnimation = theme.palette.mode === "dark" ? "#ffffff" : "#000000";
  const [isFlipped, setIsFlipped] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedData, setEditedData] = useState<FormData>(data);
  const [editedUser, setEditedUser] = useState<FormDataUser>(dataUser);


  const saveCardToLocalStorage = (data: FormData, userData: FormDataUser) => {
    localStorage.setItem(`editedData_${cardId}`, JSON.stringify(data));
    localStorage.setItem(`editedUserData_${cardId}`, JSON.stringify(userData));
    const favorites: FavoriteCard[] = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );

    const updatedFavorites = favorites.map((favorite) => {
      if (favorite.id === data.id) {
        return {
          ...favorite,
          name: data.name,
          artist: data.artist,
          releasedOn: data.releasedOn,
        };
      }
      return favorite;
    });

    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

    setIsFavorite(
      updatedFavorites.some((favorite) => favorite.name === data.name)
    );
  };

  const loadCardFromLocalStorage = (): {
    data: FormData | null;
    dataUser: FormDataUser | null;
  } => {
    const data = localStorage.getItem(`editedData_${cardId}`);
    const dataUser = localStorage.getItem(`editedUserData_${cardId}`);
    return {
      data: data ? JSON.parse(data) : null,
      dataUser: dataUser ? JSON.parse(dataUser) : null,
    };
  };

  useEffect(() => {
    const { data, dataUser } = loadCardFromLocalStorage();
    if (data) {
      setEditedData(data);
    }
    if (dataUser) {
      setEditedUser(dataUser);
    }
  }, [cardId]);

  const toggleFavorite = () => {
    const favorites: FavoriteCard[] = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    const isCurrentlyFavorite = favorites.some(
      (favorite) => favorite.id === editedData.id
    );
    const updatedFavorites = isCurrentlyFavorite
      ? favorites.filter((item) => item.id !== editedData.id)
      : [...favorites, editedData];

    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

    setIsFavorite(!isCurrentlyFavorite);
  };

  useEffect(() => {
    const favorites: FavoriteCard[] = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    const isFavorite = favorites.some(
      (favorite) => favorite.id === editedData.id
    );
    setIsFavorite(isFavorite);
  }, [editedData]);

  const handleToggleFavorite = () => {
    toggleFavorite();
  };
  const handleCardFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleFieldChange =
    (field: keyof FormData) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const updatedData = { ...editedData, [field]: event.target.value };
      setEditedData(updatedData);
      saveCardToLocalStorage(updatedData, editedUser);
    };

  const handleSelectChange =
    (field: keyof FormData) => (event: SelectChangeEvent<Genre>) => {
      const updatedData = {
        ...editedData,
        [field]: event.target.value as Genre,
      };
      setEditedData(updatedData);
      saveCardToLocalStorage(updatedData, editedUser);
    };

  const handleExitEditMode = () => {
    setIsEditMode(false);
  };

  const handleUserFieldChange =
    (field: keyof FormDataUser) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const updatedUser = { ...editedUser, [field]: event.target.value };
      setEditedUser(updatedUser);
      saveCardToLocalStorage(editedData, updatedUser);
    };

  const handleUserSelectChange =
    (field: keyof FormDataUser) => (event: SelectChangeEvent<any>) => {
      const updatedUser = {
        ...editedUser,
        [field]: event.target.value,
      };
      setEditedUser(updatedUser);
      saveCardToLocalStorage(editedData, updatedUser);
    };

  const handleUserGenreSelectChange =
    (field: keyof FormDataUser) => (event: SelectChangeEvent<any>) => {
      const selectedGenres: Genre[] = event.target.value;
      const updatedGenres = selectedGenres.slice(0, 3);

      const updatedUser = {
        ...editedUser,
        [field]: updatedGenres,
      };
      setEditedUser(updatedUser);
      saveCardToLocalStorage(editedData, updatedUser);
    };

  const minDate = "1980-01-01";
  const maxDate = new Date().toISOString().split("T")[0];
  const minAge = "18";

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
            {isEditMode ? (
              <ClearIcon
                sx={{ width: 40, height: 40, cursor: "pointer", marginTop: -1 }}
                onClick={handleExitEditMode}
              />
            ) : (
              <l-waveform
                size="35"
                stroke="3.5"
                speed="1"
                color={colorAnimation}
              ></l-waveform>
            )}
          </Box>
          <Typography variant="h4" gutterBottom>
          {translations.Card.songLabel}
          </Typography>
          {isEditMode ? (
            <TextField
              autoFocus
              value={editedData.name}
              onChange={handleFieldChange("name")}
            />
          ) : (
            <Typography variant="h6" gutterBottom>
              {editedData.name}
            </Typography>
          )}

          <Typography variant="h4" gutterBottom>
          {translations.Card.cardGenreLabel}
          </Typography>
          {isEditMode ? (
            <Select
              sx={{ width: 220 }}
              value={editedData.genre}
              onChange={handleSelectChange("genre")}
              label="Genre"
            >
              {Object.values(Genre).map((genre) => (
                <MenuItem key={genre} value={genre}>
                  {genre}
                </MenuItem>
              ))}
            </Select>
          ) : (
            <Typography variant="h6" gutterBottom>
              {editedData.genre}
            </Typography>
          )}
          <Typography variant="h4" gutterBottom>
          {translations.Card.cardArtistLabel}
          </Typography>
          {isEditMode ? (
            <TextField
              autoFocus
              value={editedData.artist}
              onChange={handleFieldChange("artist")}
            />
          ) : (
            <Typography variant="h6" gutterBottom>
              {editedData.artist}
            </Typography>
          )}
          <Typography variant="h4" gutterBottom>
          {translations.Card.cardDateLabel}
          </Typography>
          {isEditMode ? (
            <TextField
              type="date"
              autoFocus
              value={editedData.releasedOn}
              onChange={handleFieldChange("releasedOn")}
              sx={{ width: 220 }}
              inputProps={{
                min: minDate,
                max: maxDate,
              }}
            />
          ) : (
            <Typography variant="h6" gutterBottom>
              {editedData.releasedOn}
            </Typography>
          )}
          <StyledDivider>
            <Typography variant="h6">{editedUser?.name}</Typography>
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
            {isEditMode ? (
              <ClearIcon
                sx={{ width: 40, height: 40, cursor: "pointer", marginTop: -1 }}
                onClick={handleExitEditMode}
              />
            ) : (
              <l-waveform
                size="35"
                stroke="3.5"
                speed="1"
                color={colorAnimation}
              ></l-waveform>
            )}
          </Box>
          <Typography variant="h4" gutterBottom>
          {translations.Card.cardUserLabel}
          </Typography>
          {isEditMode ? (
            <TextField
              autoFocus
              value={editedUser.name}
              onChange={handleUserFieldChange("name")}
            />
          ) : (
            <Typography variant="h6" gutterBottom>
              {editedUser.name}
            </Typography>
          )}
          <Typography variant="h4" gutterBottom>
          {translations.Card.cardAgeLabel}
          </Typography>
          {isEditMode ? (
            <TextField
              autoFocus
              type="number"
              value={editedUser.age}
              onChange={handleUserFieldChange("age")}
              inputProps={{
                min: minAge,
              }}
            />
          ) : (
            <Typography variant="h6" gutterBottom>
              {editedUser.age}
            </Typography>
          )}
          <Typography variant="h4" gutterBottom>
          {translations.Card.cardMoodLabel}
          </Typography>
          {isEditMode ? (
            <Select
              sx={{ width: 220 }}
              value={editedUser.mood}
              onChange={handleUserSelectChange("mood")}
              label="Genre"
            >
              {Object.values(Mood).map((mood) => (
                <MenuItem key={mood} value={mood}>
                  {mood}
                </MenuItem>
              ))}
            </Select>
          ) : (
            <Typography variant="h6" gutterBottom>
              {editedUser.mood}
            </Typography>
          )}
          <Typography variant="h4" gutterBottom>
          {translations.Card.cardPrGenreLabel}
          </Typography>
          {isEditMode ? (
            <Select
              sx={{ width: 220 }}
              value={editedUser.genres}
              onChange={handleUserGenreSelectChange("genres")}
              label="Genre"
              multiple
            >
              {Object.values(Genre).map((genre) => (
                <MenuItem key={genre} value={genre}>
                  {genre}
                </MenuItem>
              ))}
            </Select>
          ) : (
            <Typography variant="h6" gutterBottom>
              {editedUser.genres.join(", ")}
            </Typography>
          )}
          <StyledDivider>
            <Typography variant="h6">{editedData?.name}</Typography>
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
          <ModeEditIcon
            sx={{ width: 60, height: 60, cursor: "pointer" }}
            onClick={() => setIsEditMode(true)}
          />
        </Box>
      </CardBox>
      
    </Box>
  );
}
