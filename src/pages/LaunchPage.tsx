import React from "react";

import "./pages.css";

import { getGameDescriptor } from "./pages.util";

import { Match } from "../components/games/Match/Match";
import { Tile } from "../components/shared/Tile/Tile";

export const LaunchPage = () => {
  const queryParameters = new URLSearchParams(window.location.search)
  const gameId = queryParameters.get("gameId");
  const descriptor = getGameDescriptor(gameId);

  return (
    <div className="page">
      { gameId === "colorMatch" && <Match gameDescriptor={descriptor}/> }
      { gameId === "numberMatch" && <Match gameDescriptor={descriptor}/> }
      { gameId === "yoga" && <Tile gameDescriptor={descriptor} /> }
    </div>
  )
}