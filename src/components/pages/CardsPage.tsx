import React, { useState, useEffect } from "react";
import Card from "./Card";
import {
  Box,
  Grid,
  IconButton,
  TextField,
  Select,
  MenuItem,
  InputAdornment,
  SelectChangeEvent,
} from "@mui/material";
import { Reorder } from "framer-motion";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import SearchIcon from "@mui/icons-material/Search";
import { useFormData, useUserData } from "./DataContext";
import { FormDataUser } from "./user";
import { FormData } from "./music";

interface CardData {
  id: string;
  formData: FormData;
  userData: FormDataUser;
}

const searchOptions = [
  { label: "Name", value: "name" },
  { label: "Genre", value: "genre" },
  { label: "Artist", value: "artist" },
];

const CardsPage: React.FC = () => {
  const { formData } = useFormData();
  const { userData } = useUserData();

  const [cards, setCards] = useState<CardData[]>(() => {
    const savedCards = localStorage.getItem("cards");
    if (savedCards) {
      return JSON.parse(savedCards);
    }
    return formData.map((data, index) => ({
      id: data.id,
      formData: data,
      userData: userData[index],
    }));
  });

  const [deletedCardIds, setDeletedCardIds] = useState<string[]>(() =>
    JSON.parse(localStorage.getItem("deletedCardIds") || "[]")
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchCriteria, setSearchCriteria] = useState(searchOptions[0].value);

  useEffect(() => {
    localStorage.setItem("cards", JSON.stringify(cards));
  }, [cards]);

  useEffect(() => {
    const newCards = formData.map((data, index) => ({
      id: data.id,
      formData: data,
      userData: userData[index],
    }));

    setCards((prevCards) => {
      const updatedCards = [...prevCards];
      newCards.forEach((newCard) => {
        if (
          !prevCards.some((card) => card.id === newCard.id) &&
          !deletedCardIds.includes(newCard.id)
        ) {
          updatedCards.push(newCard);
        }
      });
      return updatedCards.filter((card) => !deletedCardIds.includes(card.id));
    });
  }, [formData, deletedCardIds, userData]);

  const handleDeleteCard = (cardId: string) => {
    setDeletedCardIds((prevDeletedCardIds) => {
      const newDeletedCardIds = prevDeletedCardIds.concat(cardId);
      localStorage.setItem("deletedCardIds", JSON.stringify(newDeletedCardIds));
      return newDeletedCardIds;
    });
  };

  const filteredCards = cards.filter(
    (card) => !deletedCardIds.includes(card.id)
  );

  const nextCards = () => {
    setCurrentIndex(currentIndex + 4);
  };

  const previousCards = () => {
    setCurrentIndex(currentIndex - 4);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleCriteriaChange = (event: SelectChangeEvent) => {
    setSearchCriteria(event.target.value as string);
  };

  const filteredCardsBySearch = filteredCards.filter((card) => {
    const searchValue = searchQuery.toLowerCase();
    if (searchCriteria === "name") {
      return card.formData.name.toLowerCase().includes(searchValue);
    } else if (searchCriteria === "genre") {
      return card.formData.genre.toLowerCase().includes(searchValue);
    } else if (searchCriteria === "artist") {
      return card.formData.artist.toLowerCase().includes(searchValue);
    }
    return false;
  });

  return (
    <div style={{ position: "relative" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "40%",
          margin: "10px auto -55px",
          position: "fixed",
          top: "90px",
          left: "30%",
        }}
      >
        <Select
          value={searchCriteria}
          onChange={handleCriteriaChange}
          sx={{ minWidth: 120, marginRight: 2 }}
        >
          {searchOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
        <TextField
          label="Search"
          value={searchQuery}
          onChange={handleSearchChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{
            flexGrow: 1,
          }}
        />
      </Box>

      <Reorder.Group
        values={filteredCardsBySearch.slice(currentIndex, currentIndex + 4)}
        onReorder={(newCards) => {
          const updatedCards = [...cards];
          newCards.forEach((newCard, index) => {
            updatedCards.splice(currentIndex + index, 1, newCard);
          });
          setCards(updatedCards);
        }}
        style={{ listStyleType: "none" }}
        axis="x"
      >
        <Grid container spacing={{ xs: 0, sm: 6, md: 8, lg: 8, xl: 10 }}>
          {filteredCardsBySearch
            .slice(currentIndex, currentIndex + 4)
            .map((card: CardData) => (
              <Grid item key={card.id} xs={12} sm={6} md={4} lg={3}>
                {card.formData && card.userData && (
                  <Reorder.Item
                    value={card}
                    key={card.id}
                    whileDrag={{ scale: 1.1 }}
                  >
                    <Card
                      data={card.formData}
                      dataUser={card.userData}
                      cardId={card.id}
                      onDelete={() => handleDeleteCard(card.id)}
                    />
                  </Reorder.Item>
                )}
              </Grid>
            ))}
        </Grid>
        <Box sx={{ display: "flex", marginTop: "1rem" }}>
          {currentIndex > 0 && (
            <IconButton onClick={previousCards} aria-label="Previous">
              <ArrowBackIosIcon sx={{ width: 70, height: 70 }} />
            </IconButton>
          )}
          {filteredCardsBySearch.length > currentIndex + 4 && (
            <IconButton onClick={nextCards} aria-label="Next">
              <ArrowForwardIosIcon sx={{ width: 70, height: 70 }} />
            </IconButton>
          )}
        </Box>
      </Reorder.Group>
    </div>
  );
};

export default CardsPage;
