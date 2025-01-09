import React, { useContext } from "react";

import "./pages.css";

import { getGameDescriptor } from "./pages.util";

import { Match } from "../components/games/Match/Match";
import { ImagesSequence } from "../components/games/Sequence/ImagesSequence";
import { ChangeRecords } from "./ChangeRecords";
import { SortGame } from "../components/games/Sort/SortGame";
import { LettersSequence } from "../components/games/Sequence/LettersSequence";
import { NumbersSequence } from "../components/games/Sequence/NumbersSequence";
import { MouseSkillsJumpingShape } from "../components/games/MouseSkills/MouseSkillsJumpingShape";
import { MOUSE_SKILL_TYPE } from "../components/games/MouseSkills/MouseSkills.types";
import { SelectGame } from "../components/games/Select/SelectGame";
import { NumberLanguages } from "../components/games/NumberLanguages/NumberLanguages";
import { CodePlay } from "../CodePlay/CodePlay";
import GamesContext, { GamesContextType } from "../context/GamesContext";
import { WhatIsTheTimeAnalog } from "../components/games/Clock/WhatIsTheTimeAnalog";
import { SelectClockAnalog } from "../components/games/Clock/SelectClockAnalog";
import { Pairs } from "../components/games/Pairs/Pairs";
import { MyScheduleAnalog } from "../components/games/Clock/myScheduleAnalog";
import { MyScheduleDigital } from "../components/games/Clock/myScheduleDigital";
import { GameList } from "./GameList";


export const LaunchPage = () => {
  const queryParameters = new URLSearchParams(window.location.search)
  const gameId = queryParameters.get("gameId");
  const profile = queryParameters.get("profile");

  const {
    user
  } = useContext(GamesContext) as GamesContextType;

  const descriptor = getGameDescriptor(gameId, user, profile);

  return (
    <div className="app-page">
      { gameId === "codePlay" && <CodePlay /> }

      { gameId === "colorMatch" && <Match gameDescriptor={descriptor}/> }
      { gameId === "numberMatch" && <Match gameDescriptor={descriptor}/> }
      { gameId === "letterMatch" && <Match gameDescriptor={descriptor}/> }
      { gameId === "wordMatch" && <Match gameDescriptor={descriptor}/> }
      
      { gameId === "synonymsPairs" && <Pairs gameDescriptor={descriptor}/> }
      
      { gameId === "bathroomRoutine" && <ImagesSequence gameDescriptor={descriptor}/> }
      { gameId === "iCount" && <NumbersSequence gameDescriptor={descriptor}/> }
      { gameId === "iWriteWords" && <LettersSequence gameDescriptor={descriptor} /> }
      { gameId === "morningRoutine" && <ImagesSequence gameDescriptor={descriptor}/> }
      { gameId === "washHands" && <ImagesSequence gameDescriptor={descriptor}/> }

      { gameId === "numberLanguagesShow" && <NumberLanguages scope={ 100 }/> }

      { gameId === "mouseJumpingShapeClick" && <MouseSkillsJumpingShape eventType={MOUSE_SKILL_TYPE.CLICK}/> }

      { gameId === "colorSort" && <SortGame gameDescriptor={descriptor}/> }
      { gameId === "moodSort" && <SortGame gameDescriptor={descriptor}/> }
      { gameId === "numberSort" && <SortGame gameDescriptor={descriptor}/> }
      { gameId === "shapeSort" && <SortGame gameDescriptor={descriptor}/> }

      { gameId === "behaviorSelect" && <SelectGame gameDescriptor={descriptor}/> }
      { gameId === "moodSelect" && <SelectGame gameDescriptor={descriptor}/> }

      { gameId === "whatIsTheTimeAnalog" && <WhatIsTheTimeAnalog gameDescriptor={descriptor}/> }
      { gameId === "selectClockAnalog" && <SelectClockAnalog gameDescriptor={descriptor}/> }
      { gameId === "myScheduleAnalog" && <MyScheduleAnalog gameDescriptor={descriptor}/> }
      { gameId === "myScheduleDigital" && <MyScheduleDigital gameDescriptor={descriptor}/> }
      
      { gameId === "changeRecords" && <ChangeRecords/> }
      { gameId === "gameList" && <GameList/> }
    </div>
  )
}