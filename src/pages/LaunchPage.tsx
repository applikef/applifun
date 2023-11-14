import React from "react";

import "./pages.css";

import { getGameDescriptor } from "./pages.util";

import { Match } from "../components/games/Match/Match";
import { Sequence } from "../components/games/Sequence/Sequence";
import { ChangeRecords } from "./../components/global/ChangeRecords";
import { SortGame } from "../components/games/Sort/SortGame";
import { IWrite } from "../components/games/IWrite/IWrite";

export const LaunchPage = () => {
  const queryParameters = new URLSearchParams(window.location.search)
  const gameId = queryParameters.get("gameId");
  const descriptor = getGameDescriptor(gameId);

  return (
    <div className="app-page">
      { gameId === "iWriteWords" && <IWrite gameDescriptor={descriptor} /> }
      
      { gameId === "colorMatch" && <Match gameDescriptor={descriptor}/> }
      { gameId === "numberMatch" && <Match gameDescriptor={descriptor}/> }
      { gameId === "letterMatch" && <Match gameDescriptor={descriptor}/> }
      
      { gameId === "bathroomRoutine" && <Sequence gameDescriptor={descriptor}/> }
      { gameId === "iCount" && <Sequence gameDescriptor={descriptor}/> }
      { gameId === "morningRoutine" && <Sequence gameDescriptor={descriptor}/> }
      { gameId === "washHands" && <Sequence gameDescriptor={descriptor}/> }

      { gameId === "colorSort" && <SortGame gameDescriptor={descriptor}/> }
      { gameId === "moodSort" && <SortGame gameDescriptor={descriptor}/> }
      { gameId === "numberSort" && <SortGame gameDescriptor={descriptor}/> }

      { gameId === "changeRecords" && <ChangeRecords/> }
    </div>
  )
}