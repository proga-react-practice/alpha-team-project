import React, { useState } from "react";
import Card from "./Card";
import { FormData as MusicFormData } from "./music";
import { FormDataUser as UserFormData } from "./user";
import { Box, Grid, IconButton } from "@mui/material";
import { Reorder } from "framer-motion";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
interface CardsPageProps {
  musicData: MusicFormData[];
  userData: UserFormData[];
}

const CardsPage: React.FC<CardsPageProps> = ({ musicData, userData }) => {
  const [cards, setCards] = useState(
    musicData.map((data, index) => ({
      id: data.id,
      musicData: data,
      userData: userData[index],
    }))
  );

  const [deletedCardIds, setDeletedCardIds] = useState<string[]>(() =>
    JSON.parse(localStorage.getItem("deletedCardIds") || "[]")
  );

  const [currentIndex, setCurrentIndex] = useState(0);

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

  return (
    <Reorder.Group
      values={filteredCards.slice(currentIndex, currentIndex + 4)}
      onReorder={(newCards) => {
        const updatedCards = [...cards];
        newCards.forEach((newCard, index) => {
          updatedCards[currentIndex + index] = newCard;
        });
        setCards(updatedCards);
      }}
      style={{ listStyleType: "none" }}
      axis="x"
    >
      <Grid container spacing={2}>
        {filteredCards.slice(currentIndex, currentIndex + 4).map((card) => (
          <Grid item key={card.id} xs={12} sm={6} md={4} lg={3}>
            <Reorder.Item value={card} key={card.id} whileDrag={{ scale: 1.1 }}>
              <Card
                cardId={card.id}
                data={card.musicData}
                dataUser={card.userData}
                onDelete={() => handleDeleteCard(card.id)}
              />
            </Reorder.Item>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: "flex", marginTop: "1rem" }}>
        {currentIndex > 0 && (
          <IconButton onClick={previousCards} aria-label="Previous">
            <ArrowBackIosIcon sx={{ width: 70, height: 70 }} />
          </IconButton>
        )}
        {filteredCards.length > currentIndex + 4 && (
          <IconButton onClick={nextCards} aria-label="Next">
            <ArrowForwardIosIcon sx={{ width: 70, height: 70 }} />
          </IconButton>
        )}
      </Box>
    </Reorder.Group>
  );
};

export default CardsPage;
