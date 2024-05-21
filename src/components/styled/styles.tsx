// styles.tsx
import {
  styled,
  Box,
  Button,
  Select,
  AppBar,
  Divider,
  Modal,
  Accordion,
} from "@mui/material";
import { Link } from "react-router-dom";

export const GlobalStyle = styled("div")({
  "@global": {
    "@import":
      "url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap')",
    body: {
      fontFamily: '"Montserrat", sans-serif',
      margin: 0,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  },
});

export const FormContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  maxWidth: 400,
  padding: 50, //changed
  border: "1px solid #ccc",
  borderRadius: 10,
  backgroundColor: theme.palette.mode === "dark" ? "#000000" : "#ffffff",
  color: theme.palette.mode === "dark" ? "#646bf3" : "#6ee6ba",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  marginTop: 200, //changed
  position: "absolute",
  right: "calc(40% - 300px)",
  transition: "all 0.3s ease",
  "@media (max-width: 600px)": {
    maxWidth: "80%",
    padding: 20,
    marginTop: 100,
    right: "calc(50% - 200px)",
  },
}));

export const LeftGreenBackground = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  width: "30%",
  height: "98%",
  backgroundColor: theme.palette.mode === "dark" ? "#646bf3" : "#6ee6ba",
  color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "10px",
  zIndex: 0,
  transition: "all 0.3s ease",
  "@media (max-width: 600px)": {
    display: "none",
  },
}));

export const CustomButton = styled(Button)(({ theme }) => ({
  width: 150,
  height: 35,
  margin: "0.5em",
  color: theme.palette.mode === "dark" ? "#000000" : "#ffffff",
  backgroundColor: theme.palette.mode === "dark" ? "#646bf3" : "#6ee6ba",
  border: "none",
  borderRadius: 5,
  fontSize: 15,
  cursor: "pointer",
  position: "relative",
  zIndex: 1,
  overflow: "hidden",
}));

export const StyledSelect = styled(Select)(({ theme }) => ({
  color: theme.palette.mode === "dark" ? "#646bf3" : "#6ee6ba",
}));

export const StyledAppBar = styled(AppBar)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  backgroundColor: theme.palette.mode === "dark" ? "#646bf3" : "#6ee6ba",
  alignItems: "center",
  justifyContent: "center",
  padding: 8,
  zIndex: 1,
}));

export const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.mode === "dark" ? "#000000" : "#ffffff",
  padding: 20,
  marginRight: 50,
  fontFamily: '"Montserrat", sans-serif',
  fontSize: 25,
  textDecoration: "none",
  textTransform: "uppercase",
  fontWeight: 600,
  cursor: "pointer",
  "&:hover": {
    color: theme.palette.mode === "dark" ? "#ffffff" : "#00b575",
  },
}));

export const CardBox = styled(Box)(({ theme }) => ({
  position: "relative",
  width: 400,
  height: 600,
  borderRadius: 15,
  color: theme.palette.mode === "dark" ? "#ffffff" : " #33334d",
  border: "3px solid #ccc",
  background: theme.palette.mode === "dark" ? "#101113" : " #ffffff",
  zIndex: 0,
  placeItems: "center",
  "&:hover": {
    transform: "rotateY(-180deg)",
  },
  transition: "transform 1s ease",
  transformStyle: "preserve-3d",
}));

export const StyledDivider = styled(Divider)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#646bf3" : "#6ee6ba",
  color: "ffffff",
  width: "100%",
  height: 70,
  alignItems: "center",
  justifyContent: "center",
  margin: "auto",
  borderRadius: 7,
  textTransform: "uppercase",
  border: "3px solid #ccc",
}));

export const FavBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#646bf3" : "#6ee6ba",
  color: theme.palette.mode === "dark" ? "#ffffff" : " #33334d",
  width: 500,
  minHeight: 70,
  maxHeight: "80%",
  margin: "auto",
  borderRadius: 7,
  textTransform: "uppercase",
  border: "3px solid #ccc",
  justifyContent: "center",
  alignItems: "center",
}));

export const StyledModal = styled(Modal)(() => ({
  width: 520,
  height: 550,
  borderRadius: 20,
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  alignItems: "center",
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  border: "5px solid #ccc",
  backdropFilter: "blur(10px)",
}));

export const StyledAccordion = styled(Accordion)(() => ({
  backgroundColor: "transparent",
  backgroundImage: "none",
  width: 400,
  height: 100,
  display: "flex",
  flexDirection: "column",
  textAlign: "center",
  textTransform: "uppercase",
  margin: 50,
  borderBottom: 0,
  boxShadow: "none",
  "&:last-child": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));
