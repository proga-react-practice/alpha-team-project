import React from "react";
import Card from "./Card";
import { FormData as MusicFormData } from "./music";
import { FormDataUser as UserFormData } from "./user";
import { Grid } from "@mui/material";


interface CardsPageProps {
  musicData: MusicFormData[];
  userData: UserFormData[];
}

const CardsPage: React.FC<CardsPageProps> = ({ musicData, userData }) => {
  return (
      <Grid container spacing={2}>
        {musicData.map((data, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
            <Card key={index} data={data} dataUser={userData[index]} />
          </Grid>
        ))}
      </Grid>
  );
};

export default CardsPage;
