// AppRouter.tsx
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Layout from './Layout'; 
import Home from './components/pages/Home';
import MusicForm from './components/pages/music';
import Form from './components/pages/user'; 

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="user" element={<Form />} /> 
          <Route path="music" element={<MusicForm />} />
          <Route path="*" element={<Outlet />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
