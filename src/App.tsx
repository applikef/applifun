import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { HomePage } from "./pages/HomePage";
import { LaunchPage } from "./pages/LaunchPage";
import { GamesProvider } from "./context/GamesContext";
import { KidDevProvider } from "./CodePlay/model/KDContext";
import { DayQuiz } from "./pages/DayQuiz";

function App() {
  return (    
    <GamesProvider>
      <KidDevProvider>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="launch" element={<LaunchPage />} />
            <Route path="/dayQuiz" element={<DayQuiz />} />
          </Routes>
        </BrowserRouter>
      </KidDevProvider>
    </GamesProvider>  )
}

export default App;
