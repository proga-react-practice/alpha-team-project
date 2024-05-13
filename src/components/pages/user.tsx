import React from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  CustomButton,
  FormContainer,
  LeftGreenBackground,
} from "../styled/styles";
import {
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
} from "@mui/material";

enum Mood {
  Happy = "Happy",
  Sad = "Sad",
  Energetic = "Energetic",
  Relaxing = "Relaxing",
  Chill = "Chill",
  PumpUp = "Pump-up",
}

enum Genre {
  Pop = "Pop",
  Rock = "Rock",
  HipHopRap = "Hip-hop/Rap",
  ElectronicDance = "Electronic/Dance",
  RnBSoul = "R&B/Soul",
  Classical = "Classical",
  Jazz = "Jazz",
  Country = "Country",
  Alternative = "Alternative",
  Indie = "Indie",
}

interface FormProps {
  onSubmit?: SubmitHandler<FormDataUser>;
}

export interface FormDataUser {
  name: string;
  age: string; 
  mood: Mood | "";
  genres: Genre[];
}

const Form: React.FC<FormProps> = ({ onSubmit }) => {
  const navigate = useNavigate();
  const { handleSubmit, control, reset, formState: { errors } } = useForm<FormDataUser>({
    defaultValues: {
      name: "",
      age: "",
      mood: "",
      genres: [],
    },
  });

  const onFormSubmit: SubmitHandler<FormDataUser> = (data) => {
    if (onSubmit) {
      onSubmit(data);
    }
    reset(); 
    navigate("/music");
  };

  return (
    <Box>
      <LeftGreenBackground>
        <img
          src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNGh6enU4cHhwcHgwNG96eHRnbmZrOGVjYWI5dDEyZjZ5bnJrODBwMiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/TeBpzQZRaBIC4/giphy.gif"
          alt="Guitar GIF"
          style={{ width: "62%", height: "70%", objectFit: "cover" }}
        />
      </LeftGreenBackground>
      <FormContainer>
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <Typography variant="h4" gutterBottom>
            Music enjoyer
          </Typography>
          <Box sx={{ marginBottom: 1.5 }}>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              rules={{ required: true, validate: value => /^[a-zA-Z\s]*$/.test(value) }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Name"
                  variant="outlined"
                  fullWidth
                  error={!!errors.name}
                  helperText={errors.name ? "Only letters and spaces are allowed" : ""}
                />
              )}
            />
          </Box>
          <Box sx={{ marginBottom: 1.5 }}>
            <Controller
              name="age"
              control={control}
              defaultValue=""
              rules={{ required: true, min: 18, max: 120 }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Age"
                  type="number"
                  variant="outlined"
                  fullWidth
                  error={!!errors.age}
                  helperText={errors.age ? "Age must be between 18 and 120" : ""}
                />
              )}
            />
          </Box>
          <FormControl
            variant="outlined"
            fullWidth
            sx={{ marginBottom: 1.5 }}
          >
            <InputLabel>Mood</InputLabel>
            <Controller
              name="mood"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Mood"
                  required
                  fullWidth
                  error={!!errors.mood}
                >
                  {Object.values(Mood).map((mood) => (
                    <MenuItem key={mood} value={mood}>
                      {mood}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>
          <FormControl
            variant="outlined"
            fullWidth
            sx={{ marginBottom: 1.5 }}
          >
            <InputLabel>Genre Preferences (select up to 3)</InputLabel>
            <Controller
              name="genres"
              control={control}
              defaultValue={[]}
              rules={{ validate: value => value.length > 0 && value.length <= 3 }}
              render={({ field }) => (
                <>
                  <Select
                    {...field}
                    multiple
                    label="Genre Preferences (select up to 3)"
                    required
                    fullWidth
                    error={!!errors.genres}
                  >
                    {Object.values(Genre).map((genre) => (
                      <MenuItem key={genre} value={genre}>
                        {genre}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.genres && (
                    <Typography variant="body2" color="error">
                      {errors.genres.type === "validate" && "Select up to 3 genres"}
                    </Typography>
                  )}
                </>
              )}
            />
          </FormControl>
          <CustomButton type="submit" variant="contained">
            Submit
          </CustomButton>
          <CustomButton type="button" onClick={() => reset()} variant="contained">
            Clear Form
          </CustomButton>
        </form>
      </FormContainer>
    </Box>
  );
};

export default Form;
