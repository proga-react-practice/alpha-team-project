
import React from "react";
import { useTheme } from "@mui/material/styles";
import { StyledLink } from "./styled/styles";

const routes = [
  { path: "/home", label: "Home" },
  { path: "/user", label: "User Form" },
  { path: "/music", label: "Music Form" },
  { path: "/cards", label: "Cards" },
  { path: "/favorites", label: "Favorites" },
];

const Routes: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  const theme = useTheme();
  const linkStyle = { color: theme.palette.mode === "dark" ? "#ffffff" : "#000000" };

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
