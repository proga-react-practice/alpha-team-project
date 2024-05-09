// AppRouter.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./components/pages/Home";
import MusicForm from "./components/pages/music";
import Form from "./components/pages/user";
import CardsPage from "./components/pages/CardsPage";
import { useState } from "react";
import { FormData as MusicFormData } from "./components/pages/music";
import { FormDataUser as UserFormData } from "./components/pages/user";
import Favorites from "./components/pages/Favorites";
import NotFound from "./components/pages/NotFound.tsx";

function AppRouter() {
  const [songData, setMusicData] = useState<MusicFormData[]>([]);
  const [userData, setUserData] = useState<UserFormData[]>([]);

  const handleMusicFormSubmit = (formData: MusicFormData) => {
    setMusicData((prevDataList) => [...prevDataList, formData]);
  };
  
  const handleUserFormSubmit = (formData: UserFormData) => {
    setUserData((prevDataList) => [...prevDataList, formData]);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route
            path="user"
            element={<Form onSubmit={handleUserFormSubmit} />}
          />
          <Route
            path="music"
            element={<MusicForm onSubmit={handleMusicFormSubmit} />}
          />
          <Route path="*" element={<NotFound />} />
          <Route
            path="cards"
            element={<CardsPage musicData={songData} userData={userData} />}
          />
          <Route
            path="favorites"
            element={<Favorites favDataList={songData} />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
