import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { HomePage } from "./pages/HomePage";
import { LaunchPage } from "./pages/LaunchPage";
import { GamesProvider } from "./context/GamesContext";

function App() {
  return (
    <GamesProvider>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="launch" element={<LaunchPage />} />
        </Routes>
      </BrowserRouter>
    </GamesProvider>  )
}

export default App;
