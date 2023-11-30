import React from "react";

import "./pages.css";

import { getGameDescriptor } from "./pages.util";

import { Match } from "../components/games/Match/Match";
import { ImagesSequence } from "../components/games/Sequence/ImagesSequence";
import { ChangeRecords } from "./../components/global/ChangeRecords";
import { SortGame } from "../components/games/Sort/SortGame";
import { LettersSequence } from "../components/games/Sequence/LettersSequence";
import { NumbersSequence } from "../components/games/Sequence/NumbersSequence";
import { MouseSkillsJumpingShape } from "../components/games/MouseSkills/MouseSkillsJumpingShape";
import { MOUSE_SKILL_TYPE } from "../components/games/MouseSkills/MouseSkills.types";

export const LaunchPage = () => {
  const queryParameters = new URLSearchParams(window.location.search)
  const gameId = queryParameters.get("gameId");
  const descriptor = getGameDescriptor(gameId);

  return (
    <div className="app-page">
      { gameId === "colorMatch" && <Match gameDescriptor={descriptor}/> }
      { gameId === "numberMatch" && <Match gameDescriptor={descriptor}/> }
      { gameId === "letterMatch" && <Match gameDescriptor={descriptor}/> }
      
      { gameId === "bathroomRoutine" && <ImagesSequence gameDescriptor={descriptor}/> }
      { gameId === "iCount" && <NumbersSequence gameDescriptor={descriptor}/> }
      { gameId === "iWriteWords" && <LettersSequence gameDescriptor={descriptor} /> }
      { gameId === "morningRoutine" && <ImagesSequence gameDescriptor={descriptor}/> }
      { gameId === "washHands" && <ImagesSequence gameDescriptor={descriptor}/> }

      { gameId === "mouseJumpingShapeClick" && <MouseSkillsJumpingShape eventType={MOUSE_SKILL_TYPE.CLICK}/> }

      { gameId === "colorSort" && <SortGame gameDescriptor={descriptor}/> }
      { gameId === "moodSort" && <SortGame gameDescriptor={descriptor}/> }
      { gameId === "numberSort" && <SortGame gameDescriptor={descriptor}/> }

      { gameId === "changeRecords" && <ChangeRecords/> }
    </div>
  )
}