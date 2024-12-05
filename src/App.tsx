import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { HomePage } from "./pages/HomePage";
import { LaunchPage } from "./pages/LaunchPage";
import { GamesProvider } from "./context/GamesContext";
import { KidDevProvider } from "./CodePlay/model/KDContext";
import { DayQuiz } from "./pages/DayQuiz";
import { DayQuizDone } from "./pages/DayQuizDone";

function App() {
  return (    
    <GamesProvider>
      <KidDevProvider>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dayQuiz" element={<DayQuiz />} />
            <Route path="/dayQuizDone" element={<DayQuizDone />} />
            <Route path="launch" element={<LaunchPage />} />
          </Routes>
        </BrowserRouter>
      </KidDevProvider>
    </GamesProvider>  )
}

export default App;
