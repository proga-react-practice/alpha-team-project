import React from "react";
import { useTheme } from "@mui/material/styles";
import { StyledLink } from "./styled/styles";
import { useLanguage } from "./LanguageContext";

export const routes = {
  home: "/home",
  user: "/user",
  music: "/music",
  cards: "/cards",
  favorites: "/favorites",
  playlist: "/playlist",
  contact: "/contact",
};

const Routes: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  const theme = useTheme();
  const { translations } = useLanguage();
  const linkStyle = { color: theme.palette.mode === "dark" ? "#ffffff" : "#000000" };

  const routeList = [
    { path: routes.home, label: translations.routes.homepage },
    { path: routes.user, label: translations.routes.userform },
    { path: routes.music, label: translations.routes.musicform },
    { path: routes.cards, label: translations.routes.cards },
    { path: routes.favorites, label: translations.routes.favorites },
    { path: routes.playlist, label: translations.routes.playlist },
    { path: routes.contact}
  ];

  return (
    <>
      {routeList.map(({ path, label }) => (
        <StyledLink key={path} to={path} sx={linkStyle} onClick={onClick}>
          {label}
        </StyledLink>
      ))}
    </>
  );
};

export default Routes;
