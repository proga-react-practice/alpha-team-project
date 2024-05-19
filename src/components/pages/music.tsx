// music.tsx
import React, { useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
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
import { useLanguage } from "../LanguageContext";

enum Genre {
  Funk = "Funk",
  Rock = "Rock",
  Metal = "Metal",
  Jazz = "Jazz",
  Pop = "Pop",
  HipHopRap = "HipHopRap",
  ElectronicDance = "ElectronicDance",
  RnBSoul = "RnBSoul",
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
  const { translations } = useLanguage();
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

  const onSubmitHandler: SubmitHandler<FormData> = (data) => {
    if (onSubmit) {
      onSubmit(data);
      console.log("Form data submitted:", data);
    }
    setFormData((prevData) => [...prevData, data]);
    navigate("/playlist");
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
            {translations.form.musicDescription}
          </Typography>
        </div>
      </LeftGreenBackground>

      <FormContainer>
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <Typography variant="h4" gutterBottom>
            {translations.form.musictitle}
          </Typography>

          <TextField
            label={translations.form.musicLabel}
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
                <InputLabel>{translations.form.musicGenre}</InputLabel>
                <Select {...field} label={translations.form.musicGenre}>
                  {Object.values(Genre).map((genre) => (
                    <MenuItem key={genre} value={genre}>
                      {translations.enums.Genre[genre]}
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
              label={translations.form.artistLabel}
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
            <FormLabel htmlFor="releasedOn">
              {translations.form.dateLabel}
            </FormLabel>
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
            {translations.form.submitButton}
          </CustomButton>
          <CustomButton type="button" onClick={handleReset} variant="contained">
            {translations.form.clearButton}
          </CustomButton>
        </form>
      </FormContainer>
    </Box>
  );
};

export default MusicForm;
