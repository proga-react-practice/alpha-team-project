import { Box, Typography } from "@mui/material";
import icon1 from "../../img/icon1female.png";
import icon2 from "../../img/icon2female.png";
import icon3 from "../../img/icon3female.png";
import icon4 from "../../img/icon1man.png";
import { CustomButton, StyledModal } from "../styled/styles";
import { useLanguage } from "../LanguageContext";
import { useEffect, useState } from "react";
import { User } from "./UsersBox";

interface ModalUserProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string | null;
}

export default function ModalUser({ isOpen, onClose, userId }: ModalUserProps) {
  const { translations } = useLanguage();
  const iconArray = [icon1, icon2, icon3, icon4];
  const [randomIcon] = useState<string>(() => {
    const randomIndex = Math.floor(Math.random() * iconArray.length);
    return iconArray[randomIndex];
  });
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    if (userId) {
      const savedUsers = localStorage.getItem("users");
      if (savedUsers) {
        const users = JSON.parse(savedUsers);
        const user = users.find((user: User) => user.id === userId);
        setUserData(user || null);
      }
    }
  }, [userId]);

  if (!userData) {
    return null;
  }
  return (
    <StyledModal
      BackdropProps={{
        style: { backgroundColor: "rgba(0, 0, 0, 0)" },
      }}
      open={isOpen}
    >
      <Box>
        <Box sx={{ marginBottom: 2, textAlign: "center" }}>
          <img
            src={randomIcon}
            alt="Avatar"
            style={{ width: 120, height: 120, borderRadius: "50%" }}
          />
          <Typography sx={{ fontSize: 35 }}>
            {translations.card.user} {userData.userName}
          </Typography>
          <Typography sx={{ fontSize: 35 }}>
            {translations.card.age} {userData.age}
          </Typography>
          <Typography sx={{ fontSize: 35 }}>
            {translations.card.mood} {translations.enums.Mood[userData.mood]}
          </Typography>
          <Typography
            sx={{ fontSize: 35, overflowWrap: "break-word", margin: 1 }}
          >
            {translations.card.preferredGenres}{" "}
            {userData.genres && Array.isArray(userData.genres)
              ? userData.genres
                  .map((genre) => translations.enums.Genre[genre])
                  .join(", ")
              : "No genres available"}
          </Typography>
          <CustomButton sx={{ marginTop: 4 }} onClick={onClose}>
            Close
          </CustomButton>
        </Box>
      </Box>
    </StyledModal>
  );
}
