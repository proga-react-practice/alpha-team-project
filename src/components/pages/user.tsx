// user.tsx
import React, { useState } from 'react';
import { TextField, Typography, Select, MenuItem, FormControl, InputLabel, Box } from '@mui/material';
import { SelectChangeEvent } from '@mui/material';
import { useNavigate } from 'react-router-dom'; 
import { CustomButton, FormContainer, LeftGreenBackground } from '../styled/styles'; 

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
  onSubmit?: (formData: FormData) => void;
}

interface FormData {
  name: string;
  age: string;
  mood: Mood | '';
  genres: Genre[];
}

const Form: React.FC<FormProps> = ({ onSubmit }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    age: '',
    mood: '',
    genres: [],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleMoodChange = (e: SelectChangeEvent<Mood>) => {
    const selectedMood = e.target.value as Mood;
    setFormData({ ...formData, mood: selectedMood });
  };
  
  const handleGenreChange = (e: SelectChangeEvent<typeof formData.genres>) => {
    const selectedGenres = e.target.value as Genre[];
    setFormData({ ...formData, genres: selectedGenres });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.age || !formData.mood || formData.genres.length === 0) {
      alert('Please fill in all fields.');
      return;
    }

    if (formData.genres.length > 3) {
      alert('Please select up to 3 genres.');
      return;
    }

    if (onSubmit) {
      onSubmit(formData);
    }
    clearForm();
    navigate('/music');
  };

  const clearForm = () => {
    setFormData({
      name: '',
      age: '',
      mood: '',
      genres: [],
    });
  };

  return (
    <Box>
      <LeftGreenBackground>
    <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNGh6enU4cHhwcHgwNG96eHRnbmZrOGVjYWI5dDEyZjZ5bnJrODBwMiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/TeBpzQZRaBIC4/giphy.gif" alt="Guitar GIF" style={{ width: '62%', height: '70%', objectFit: 'cover' }} />

</LeftGreenBackground>
    <FormContainer>
      <form onSubmit={handleSubmit}> 
        <Typography variant="h4" gutterBottom>
            Music enjoyer
        </Typography>
        <Box sx={{ marginBottom: '12px' }}> 
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            variant="outlined"
            size="small"
            fullWidth
          />
        </Box>
        <Box sx={{ marginBottom: '12px' }}> 
          <TextField
            label="Age"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            type="number"
            variant="outlined"
            size="small"
            fullWidth
          />
        </Box>
        <FormControl variant="outlined" fullWidth sx={{ marginBottom: '12px' }}>
          <InputLabel>Mood</InputLabel>
          <Select
            label="Mood"
            name="mood"
            value={formData.mood}
            onChange={handleMoodChange}
            required
            fullWidth
          >
            {Object.values(Mood).map(mood => (
              <MenuItem key={mood} value={mood}>{mood}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="outlined" fullWidth sx={{ marginBottom: '12px' }}>
          <InputLabel>Genre Preferences (select up to 3)</InputLabel>
          <Select
            multiple
            label="Genre Preferences (select up to 3)"
            name="genres"
            value={formData.genres}
            onChange={handleGenreChange}
            required
            fullWidth
          >
            {Object.values(Genre).map(genre => (
              <MenuItem key={genre} value={genre}>
                {genre}
              </MenuItem>
            ))}
          </Select>
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

export default Form;
