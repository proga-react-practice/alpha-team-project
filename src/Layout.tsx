import React, { useState } from "react";
import { Box, Toolbar, IconButton, Drawer, useTheme, useMediaQuery } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { Outlet } from "react-router-dom";
import { StyledAppBar } from "./components/styled/styles";
import Routes from "./components/Routes";

const Layout: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const toggleDrawer = (open: boolean) => () => {
    setIsDrawerOpen(open);
  };
  
  const handleItemClick = () => {
    setIsDrawerOpen(false); 
  };

  return (
    <Box>
      <StyledAppBar>
        <Toolbar>
          {!isMobile && <Routes onClick={handleItemClick} />}
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
            <Routes onClick={handleItemClick} />
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
