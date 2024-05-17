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
import { useUserData } from "./DataContext";

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
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormDataUser>({
    defaultValues: {
      name: "",
      age: "",
      mood: "",
      genres: [],
    },
  });
  const { setUserData } = useUserData();
  const onFormSubmit: SubmitHandler<FormDataUser> = (data) => {
    if (onSubmit) {
      onSubmit(data);
      console.log("User data submitted:", data);
    }

    setUserData((prevData) => [...prevData, data]);
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
              rules={{
                required: "Name is required",
                pattern: {
                  value: /^[a-zA-Z\s]*$/,
                  message: "Only letters and spaces are allowed",
                },
                minLength: {
                  value: 3,
                  message: "Name must be at least 3 characters long",
                },
                maxLength: {
                  value: 30,
                  message: "Name must be less than 30 characters long",
                },
                validate: {
                  noLeadingSpace: (value) =>
                    value.trim().length === value.length ||
                    "Name cannot start with a space",
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Name"
                  variant="outlined"
                  fullWidth
                  error={!!errors.name}
                  helperText={errors.name ? errors.name.message : ""}
                />
              )}
            />
          </Box>
          <Box sx={{ marginBottom: 1.5 }}>
            <Controller
              name="age"
              control={control}
              defaultValue=""
              rules={{
                required: "Age is required",
                min: {
                  value: 18,
                  message: "Age must be at least 18",
                },
                max: {
                  value: 120,
                  message: "Age must be less than or equal to 120",
                },
                validate: {
                  isNumber: (value) =>
                    !isNaN(Number(value)) || "Age must be a number",
                  noSpecialChars: (value) =>
                    /^[0-9]*$/.test(value) ||
                    "Age must not contain special characters",
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Age"
                  type="number"
                  variant="outlined"
                  fullWidth
                  error={!!errors.age}
                  helperText={errors.age ? errors.age.message : ""}
                />
              )}
            />
          </Box>
          <FormControl variant="outlined" fullWidth sx={{ marginBottom: 1.5 }}>
            <InputLabel>Mood</InputLabel>
            <Controller
              name="mood"
              control={control}
              defaultValue=""
              rules={{ required: "Mood is required" }}
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
            {errors.mood && (
              <Typography variant="body2" color="error">
                {errors.mood.message}
              </Typography>
            )}
          </FormControl>
          <FormControl variant="outlined" fullWidth sx={{ marginBottom: 1.5 }}>
            <InputLabel>Genre Preferences (select up to 3)</InputLabel>
            <Controller
              name="genres"
              control={control}
              defaultValue={[]}
              rules={{
                validate: {
                  required: (value) =>
                    value.length > 0 || "At least one genre is required",
                  max: (value) =>
                    value.length <= 3 || "You can select up to 3 genres",
                },
              }}
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
                      {errors.genres.type === "validate" &&
                        errors.genres.message}
                    </Typography>
                  )}
                </>
              )}
            />
          </FormControl>
          <CustomButton type="submit" variant="contained">
            Submit
          </CustomButton>
          <CustomButton
            type="button"
            onClick={() => reset()}
            variant="contained"
          >
            Clear Form
          </CustomButton>
        </form>
      </FormContainer>
    </Box>
  );
};

export default Form;
