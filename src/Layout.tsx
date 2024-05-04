import React, { useState } from "react";
import { Box, Toolbar, IconButton, Drawer, useMediaQuery } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { Outlet } from "react-router-dom";
import { StyledAppBar, StyledLink } from "./components/styled/styles";
import { useTheme } from "@mui/material/styles"; 

const Layout: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)');
  const theme = useTheme();

  const toggleDrawer = (open: boolean) => () => {
    setIsDrawerOpen(open);
  };
  

  const linkStyle = {
    color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
  };

  const handleItemClick = () => {
    setIsDrawerOpen(false); 
  };

  return (
    <Box>
      <StyledAppBar>
        <Toolbar>
          {!isMobile && (
            <>
              <StyledLink to="/home" sx={linkStyle} onClick={handleItemClick}>Home</StyledLink>
              <StyledLink to="/user" sx={linkStyle} onClick={handleItemClick}>User Form</StyledLink>
              <StyledLink to="/music" sx={linkStyle} onClick={handleItemClick}>Music Form</StyledLink>
              <StyledLink to="/cards" sx={linkStyle} onClick={handleItemClick}>Cards</StyledLink>
              <StyledLink to="/favorites" sx={linkStyle} onClick={handleItemClick}>Favorites</StyledLink>
            </>
          )}
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon style={{ color: theme.palette.mode === "dark" ? "#ffffff" : "#000000" }} />
            </IconButton>
          )}
          <Drawer
            anchor="left"
            open={isDrawerOpen}
            onClose={toggleDrawer(false)}
            sx={{
              "& .MuiDrawer-paper": {
                backgroundColor: theme.palette.background.default,
                color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                width: "100vw",
                display: "flex",
                flexDirection: "column",
                padding: "1rem",
              },
            }}
          >
            <StyledLink to="/home" sx={linkStyle} onClick={handleItemClick}>Home</StyledLink>
            <StyledLink to="/user" sx={linkStyle} onClick={handleItemClick}>User Form</StyledLink>
            <StyledLink to="/music" sx={linkStyle} onClick={handleItemClick}>Music Form</StyledLink>
            <StyledLink to="/cards" sx={linkStyle} onClick={handleItemClick}>Cards</StyledLink>
            <StyledLink to="/favorites" sx={linkStyle} onClick={handleItemClick}>Favorites</StyledLink>
          </Drawer>
        </Toolbar>
      </StyledAppBar>
      <main>
        <Outlet />
      </main>
    </Box>
  );
};

export default Layout;
