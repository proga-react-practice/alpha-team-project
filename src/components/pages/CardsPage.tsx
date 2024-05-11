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
    <Reorder.Group values={cards} onReorder={setCard} axis="x">
      <Grid container spacing={2}>
        {cards.map((data, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
            <Reorder.Item
              value={data}
              key={index}
              whileDrag={{ scale: 1.1 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.3 },
              }}
            >
              <Card key={index} data={data} dataUser={userData[index]} />
            </Reorder.Item>
          </Grid>
        ))}
      </Grid>
    </Reorder.Group>
  );
};

export default CardsPage;
