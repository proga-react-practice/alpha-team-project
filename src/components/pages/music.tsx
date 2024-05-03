// music.tsx
import React, { useState } from "react";
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
import { SelectChangeEvent } from "@mui/material";
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
}

export interface FormData {
  name: string;
  genre: Genre | "";
  artist: string;
  releasedOn: string;
}

const MusicForm: React.FC<MusicFormProps> = ({ onSubmit }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    genre: "",
    artist: "",
    releasedOn: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "releasedOn") {
      const today = new Date().toISOString().split("T")[0];
      if (value < "1980-01-01") {
        setFormData((prev) => ({ ...prev, [name]: "1980-01-01" }));
      } else if (value > today) {
        setFormData((prev) => ({ ...prev, [name]: today }));
      } else {
        setFormData((prev) => ({ ...prev, [name]: value }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleGenreChange = (e: SelectChangeEvent<Genre>) => {
    const selectedGenre = e.target.value as Genre;
    setFormData({ ...formData, genre: selectedGenre });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.genre ||
      !formData.artist ||
      !formData.releasedOn
    ) {
      alert("Please fill in all fields.");
      return;
    }

    if (onSubmit) {
      onSubmit(formData);
    }
    clearForm();
    navigate("/cards");
  };

  const clearForm = () => {
    setFormData({
      name: "",
      genre: "",
      artist: "",
      releasedOn: "",
    });
  };

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
        <form onSubmit={handleSubmit}>
          <Typography variant="h4" gutterBottom>
            Tracks
          </Typography>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            sx={{ marginBottom: "12px" }} // Add marginBottom style here
          />
          <FormControl
            variant="outlined"
            fullWidth
            sx={{ marginBottom: "12px" }}
          >
            <InputLabel>Genre</InputLabel>
            <Select
              label="Genre"
              name="genre"
              value={formData.genre}
              onChange={handleGenreChange}
              required
            >
              {Object.values(Genre).map((genre) => (
                <MenuItem key={genre} value={genre}>
                  {genre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl
            variant="outlined"
            fullWidth
            sx={{ marginBottom: "12px" }}
          >
            <TextField
              label="Artist"
              name="artist"
              value={formData.artist}
              onChange={handleInputChange}
              variant="outlined"
              margin="normal"
              required
              fullWidth
            />
          </FormControl>
          <FormControl
            variant="outlined"
            fullWidth
            sx={{ marginBottom: "12px" }}
          >
            <FormLabel htmlFor="releasedOn">Released on</FormLabel>
            <TextField
              type="date"
              id="releasedOn"
              name="releasedOn"
              value={formData.releasedOn}
              required
              onChange={handleInputChange}
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              size="small"
            />
          </FormControl>
          <CustomButton type="submit" variant="contained">
            Submit
          </CustomButton>
          <CustomButton type="button" onClick={clearForm} variant="contained">
            Clear Form
          </CustomButton>
        </form>
      </FormContainer>
    </Box>
  );
};

export default MusicForm;
