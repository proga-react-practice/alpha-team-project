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
  FormHelperText,
} from "@mui/material";

import {
  FormContainer,
  CustomButton,
  LeftGreenBackground,
} from "../styled/styles";
import { useNavigate } from "react-router-dom";
import { useFormData } from "./DataContext";

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

  const { setFormData } = useFormData();

  const onSubmitHandler = (data: FormData) => {
    if (onSubmit) {
      onSubmit(data);
      console.log("Form data submitted:", data);
    }
    setFormData((prevData) => [...prevData, data]);
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
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 2,
                message: "Name must be at least 2 character long",
              },
              maxLength: {
                value: 20,
                message: "Name must be less than 20 character long",
              },
              validate: (value) =>
                value.charAt(0) === value.charAt(0).toUpperCase() ||
                "Name should start with a capital letter",
            })}
            variant="outlined"
            margin="normal"
            fullWidth
            sx={{ marginBottom: 1.5 }}
            error={!!errors.name}
            helperText={errors.name?.message}
          />

          <Controller
            name="genre"
            control={control}
            defaultValue=""
            rules={{ required: { value: true, message: "Genre is required" } }}
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
                  <FormHelperText error>{errors.genre.message}</FormHelperText>
                )}
              </FormControl>
            )}
          />
          <FormControl variant="outlined" fullWidth sx={{ marginBottom: 1.5 }}>
            <TextField
              label="Artist"
              {...register("artist", {
                required: "Artist is required",
                minLength: {
                  value: 2,
                  message: "Artist must be at least 2 character long",
                },
                maxLength: {
                  value: 20,
                  message: "Artist must be less than 20 character long",
                },
                validate: (value) =>
                  value.charAt(0) === value.charAt(0).toUpperCase() ||
                  "Artist should start with a capital letter",
              })}
              variant="outlined"
              margin="normal"
              fullWidth
              error={!!errors.artist}
              helperText={errors.artist?.message}
            />
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
              error={!!errors.releasedOn}
              helperText={errors.releasedOn?.message}
            />
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
