// Layout.tsx
import {  Box, Toolbar } from '@mui/material';
import React from 'react';
import {  Outlet } from 'react-router-dom';
import { StyledAppBar, StyledLink } from './components/styled/styles';


const Layout: React.FC = () => {
  return (
    <Box>
      <StyledAppBar >
      <Toolbar>
        <StyledLink to="/home">Home</StyledLink>
        <StyledLink to="/user"> User Form</StyledLink>
        <StyledLink to="/music"> Music Form</StyledLink>
        <StyledLink to="/cards">Cards</StyledLink> 
        <StyledLink to="/favorites">Favorites</StyledLink>
        </Toolbar>
      </StyledAppBar>
      <main><Outlet /></main>
    </Box>
  );
};

export default Layout;
