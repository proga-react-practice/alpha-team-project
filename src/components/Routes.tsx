import React from "react";
import { useTheme } from "@mui/material/styles";
import { StyledLink } from "./styled/styles";
import { useLanguage } from "./LanguageContext";

const Routes: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  const theme = useTheme();
  const { translations } = useLanguage();
  const linkStyle = { color: theme.palette.mode === "dark" ? "#ffffff" : "#000000" };

  const routes = [
    { path: "/home", label: translations.routes.homepage },
    { path: "/user", label: translations.routes.userform },
    { path: "/music", label: translations.routes.musicform },
    { path: "/cards", label: translations.routes.cards },
    { path: "/favorites", label: translations.routes.favorites },
  ];

  return (
    <>
      {routes.map(({ path, label }) => (
        <StyledLink key={path} to={path} sx={linkStyle} onClick={onClick}>
          {label}
        </StyledLink>
      ))}
    </>
  );
};

export default Routes;
