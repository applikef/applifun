import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { HomePage } from "./pages/HomePage";
import { LaunchPage } from "./pages/LaunchPage";
import { LandingPage } from "./pages/LandingPage";

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
          <Route path="home" element={<HomePage />} />
          <Route path="launch" element={<LaunchPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
