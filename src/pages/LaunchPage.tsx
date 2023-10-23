import React from "react";

//import { getGameDescriptor } from "./pages.util";

import { ColorMatch } from "../components/games/ColorMatch/ColorMatch";
import { NumberMatch } from "../components/games/NumberMatch/NumberMatch";

import "./pages.css";

export const LaunchPage = () => {
  const queryParameters = new URLSearchParams(window.location.search)
  const gameId = queryParameters.get("gameId");
  //const descriptor = getGameDescriptor(gameId);

  return (
    <div className="page">
      { gameId === "colorMatch" && <ColorMatch/> }
      { gameId === "numberMatch" && <NumberMatch/> }
      { /* gameId === "colorMatch" && <ColorMatch gameDescriptor={descriptor} /> */ }
    </div>
  )
}