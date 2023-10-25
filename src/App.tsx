import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { HomePage } from "./pages/HomePage";
import { LaunchPage } from "./pages/LaunchPage";

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<HomePage />} />
          <Route path="launch" element={<LaunchPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
