import { FormData } from "./music";
import { Typography, Box, useTheme } from "@mui/material";
import { FormDataUser } from "./user";
import { CardBox, StyledDivider } from "../styled/styles";
import { waveform } from "ldrs";

waveform.register();

export interface FavoriteCard {
  name: string;
  artist: string;
}

export interface Props {
  data: FormData;
  dataUser: FormDataUser;
}

export default function Card({ data, dataUser }: Props) {
  const theme = useTheme();

  const color = theme.palette.mode === "dark" ? "#ffffff" : "#000000";

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
      <CardBox>
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
              color={color}
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
              color={color}
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
      </CardBox>
    </Box>
  );
}
