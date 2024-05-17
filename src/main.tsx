import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import {
  MusicProvider,
  UserProvider,
} from "./components/pages/DataContext.tsx";
import { LanguageProvider } from "./components/LanguageContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <MusicProvider>
    <UserProvider>
      <LanguageProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
      </LanguageProvider>
    </UserProvider>
  </MusicProvider>
);
