// music.tsx
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  FormLabel,
} from "@mui/material";

import {
  FormContainer,
  CustomButton,
  LeftGreenBackground,
} from "../styled/styles";
import { useNavigate } from "react-router-dom";

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

interface MusicFormProps {
  onSubmit?: (formData: FormData) => void;
  id: string;
}

export interface FormData {
  id: string;
  name: string;
  genre: Genre | "";
  artist: string;
  releasedOn: string;
}

const MusicForm: React.FC<MusicFormProps> = ({ onSubmit }) => {
  const navigate = useNavigate();
  const [id, setId] = useState<string>(new Date().getTime().toString());
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ defaultValues: { id } });

  const onSubmitHandler = (data: FormData) => {
    if (onSubmit) {
      onSubmit(data);
    }
    navigate("/cards");
  };
  const handleReset = () => {
    setId(new Date().getTime().toString());
    reset();
  };

  const minDate = "1980-01-01";
  const today = new Date().toISOString().split("T")[0];

  return (
    <Box>
      <LeftGreenBackground>
        <div style={{ width: "80%", textAlign: "center" }}>
          <img
            src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMXkzY3VkOWZ6cHRza2MxdmZ3ZGVmN2g2cWQ2YnV3b29lcnJmaTB3YSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/LwBTamVefKJxmYwDba/giphy.gif"
            alt="Guitar GIF"
            style={{ width: "62%", height: "36%", objectFit: "cover" }}
          />
          <Typography variant="h4" sx={{ textTransform: "uppercase" }}>
            Share Your Musical Journey with Us
          </Typography>
        </div>
      </LeftGreenBackground>

      <FormContainer>
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <Typography variant="h4" gutterBottom>
            Tracks
          </Typography>

          <TextField
            label="Name"
            {...register("name", { required: true })}
            variant="outlined"
            margin="normal"
            fullWidth
            sx={{ marginBottom: 1.5 }}
          />
          {errors.name && (
            <Typography sx={{ marginBottom: 2, marginTop: -0.5 }}>
              Name is required
            </Typography>
          )}

          <Controller
            name="genre"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <FormControl
                variant="outlined"
                fullWidth
                sx={{ marginBottom: 1.5 }}
              >
                <InputLabel>Genre</InputLabel>
                <Select {...field} label="Genre">
                  {Object.values(Genre).map((genre) => (
                    <MenuItem key={genre} value={genre}>
                      {genre}
                    </MenuItem>
                  ))}
                </Select>
                {errors.genre && (
                  <Typography sx={{ marginBottom: -2, marginTop: 1 }}>
                    Genre is required
                  </Typography>
                )}
              </FormControl>
            )}
          />
          <FormControl variant="outlined" fullWidth sx={{ marginBottom: 1.5 }}>
            <TextField
              label="Artist"
              {...register("artist", { required: true })}
              variant="outlined"
              margin="normal"
              fullWidth
            />
            {errors.artist && (
              <Typography sx={{ marginBottom: 1, marginTop: -0.3 }}>
                Artist is required
              </Typography>
            )}
          </FormControl>

          <FormControl variant="outlined" fullWidth sx={{ marginBottom: 1.5 }}>
            <FormLabel htmlFor="releasedOn">Released on</FormLabel>
            <TextField
              type="date"
              {...register("releasedOn", {
                required: "Date is required",
                min: { value: minDate, message: "Enter a date after 1980" },
                max: { value: today, message: "Enter a date before today" },
              })}
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              size="small"
            />
            {errors.releasedOn && (
              <Typography sx={{ marginBottom: -1, marginTop: 1 }}>
                {errors.releasedOn.message}
              </Typography>
            )}
          </FormControl>
          <CustomButton type="submit" variant="contained">
            Submit
          </CustomButton>
          <CustomButton type="button" onClick={handleReset} variant="contained">
            Clear Form
          </CustomButton>
        </form>
      </FormContainer>
    </Box>
  );
};

export default MusicForm;
