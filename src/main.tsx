import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import {
  MusicProvider,
  UserProvider,
} from "./components/pages/DataContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <MusicProvider>
    <UserProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </UserProvider>
  </MusicProvider>
);
