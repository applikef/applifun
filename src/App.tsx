import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { HomePage } from "./pages/HomePage";
import { LaunchPage } from "./pages/LaunchPage";
import { LandingPage } from "./pages/LandingPage";
import { GamesProvider } from "./context/GamesContext";
import { ChangeRecords } from "./components/shared/ChangeRecords/ChangeRecords";

function App() {
  return (
    <GamesProvider>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
            <Route path="home" element={<HomePage />} />
            <Route path="launch" element={<LaunchPage />} />
            <Route path="changeRecords" element={<ChangeRecords />} />
        </Routes>
      </BrowserRouter>
    </GamesProvider>  )
}

export default App;
