// Layout.tsx
import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
  return (
    <div>
      <header>
        <h1>Welcome to My Music App</h1>
        <Link to="/user">Go to Music Form</Link>
      </header>
      <main><Outlet /></main>
      <footer>
        <p>Footer content goes here</p>
      </footer>
    </div>
  );
};

export default Layout;
