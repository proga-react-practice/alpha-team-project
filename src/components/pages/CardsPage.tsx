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
  const [cards, setCard] = useState(musicData);

  return (
    <Reorder.Group
      values={cards}
      onReorder={(newCards) => {
        setCard(newCards);
      }}
      axis="x"
    >
      <Grid container spacing={2}>
        {cards.map((data, index) => {
          const user = userData[index];
          return (
            <Grid item key={data.id} xs={12} sm={6} md={4} lg={3}>
              <Reorder.Item
                value={data}
                key={data.id}
                whileDrag={{ scale: 1.1 }}
                initial={{ opacity: 0, y: 30 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.3 },
                }}
              >
                <Card key={data.id} data={data} dataUser={user} />
              </Reorder.Item>
            </Grid>
          );
        })}
      </Grid>
    </Reorder.Group>
  );
};

export default CardsPage;
