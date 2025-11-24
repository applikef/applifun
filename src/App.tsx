import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import sqlite3 from "sqlite3"

import { HomePage } from "./pages/HomePage";
import { LaunchPage } from "./pages/LaunchPage";
import { GamesProvider } from "./context/GamesContext";
import { KidDevProvider } from "./CodePlay/model/KDContext";
import { DayQuiz } from "./pages/DayQuiz";
import { DayQuizDone } from "./pages/DayQuizDone";
import { Login } from "./pages/Login";

function App() {
  // const db = new sqlite3.Database("/assets/db/users.db");

  return (    
    <GamesProvider>
      <KidDevProvider>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dayQuiz" element={<DayQuiz />} />
            <Route path="/dayQuizDone" element={<DayQuizDone />} />
            <Route path="launch" element={<LaunchPage />} />
          </Routes>
        </BrowserRouter>
      </KidDevProvider>
    </GamesProvider>  )
}

export default App;
