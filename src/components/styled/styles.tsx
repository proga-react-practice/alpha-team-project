// styles.tsx
import { styled, Box, Button, Select } from '@mui/material';


export const GlobalStyle = styled('div')({
  '@global': {
    '@import': "url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap')",
    body: {
      fontFamily: '"Montserrat", sans-serif',
      margin: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
});

export const FormContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: 400,
  padding: 20,
  border: '1px solid #ccc', 
  borderRadius: 10,
  backgroundColor: theme.palette.mode === 'dark' ? '#000000' : '#ffffff',
  color: theme.palette.mode === 'dark' ? '#646bf3' : '#6ee6ba', 
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '120px',
  position: 'absolute',
  right: 'calc(40% - 300px)',
  zIndex: 1,
  overflow: 'hidden',
}));

export const LeftGreenBackground = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '30%',
  height: '100%',
  backgroundColor: theme.palette.mode === 'dark' ? '#646bf3' : '#6ee6ba',
  color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '10px', 
}));




export const CustomButton = styled(Button)(({ theme }) => ({
  width: 150,
  height: 35,
  margin: '0.5em',
  color: theme.palette.mode === 'dark' ? '#000000' : '#ffffff',
  backgroundColor: theme.palette.mode === 'dark' ? '#646bf3' : '#6ee6ba',
  border: 'none',
  borderRadius: 5,
  fontSize: 15,
  cursor: 'pointer',
  position: 'relative',
  zIndex: 1,
  overflow: 'hidden',


  
}));

export const StyledSelect = styled(Select)(({ theme }) => ({
  color: theme.palette.mode === 'dark' ? '#646bf3' : '#6ee6ba',
  
}));
