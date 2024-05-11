import React, { useState } from "react";
import Card from "./Card";
import { FormData as MusicFormData } from "./music";
import { FormDataUser as UserFormData } from "./user";
import { Grid } from "@mui/material";
import { Reorder } from "framer-motion";

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

  const handleDeleteCard = (cardId: string) => {
    setCards((prevCards) => prevCards.filter((card) => card.id !== cardId));
  };

  return (
    <Reorder.Group
      values={cards}
      onReorder={(newCards) => {
        setCards(newCards);
      }}
      axis="x"
    >
      <Grid container spacing={2}>
        {cards.map((card) => (
          <Grid item key={card.id} xs={12} sm={6} md={4} lg={3}>
            <Reorder.Item value={card} key={card.id} whileDrag={{ scale: 1.1 }}>
              <Card
                data={card.musicData}
                dataUser={card.userData}
                onDelete={() => handleDeleteCard(card.id)}
              />
            </Reorder.Item>
          </Grid>
        ))}
      </Grid>
    </Reorder.Group>
  );
};

export default CardsPage;
