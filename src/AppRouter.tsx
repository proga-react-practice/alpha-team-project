// AppRouter.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./components/pages/Home";
import MusicForm from "./components/pages/music";
import Form from "./components/pages/user";
import CardsPage from "./components/pages/CardsPage";
import Favorites from "./components/pages/Favorites";
import NotFound from "./components/pages/NotFound.tsx";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="user" element={<Form />} />
          <Route path="music" element={<MusicForm />} />
          <Route path="*" element={<NotFound />} />
          <Route path="cards" element={<CardsPage />} />
          <Route path="favorites" element={<Favorites />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
