import React, { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import { FACES, FaceFeedback } from "../../shared/FaceFeedback/FaceFeedback";

import GamesContext, { GamesContextType } from "../../../context/GamesContext";
import { MOUSE_SKILL_LEVEL, MOUSE_SKILL_TYPE } from "./MouseSkills.types";

import "./MouseSkills.css";

import { PlayListNames } from "../../../assets/playLists";
import { MediaUtil } from "../../../utils/MediaUtil";
import { Banner } from "../../shared/Banner/Banner";
import { ConstantsUtil } from "../../../utils/ConstantsUtil";

const mouseEventTypeDescriptors = [
  {
    id: MOUSE_SKILL_TYPE.HOVER,
    title: "עֲמִידָה מֵעַל"
  }, 
  {
    id: MOUSE_SKILL_TYPE.CLICK,
    title: "לְחִיצָה"
  }, 
  {
    id: MOUSE_SKILL_TYPE.DOUBLE_CLICK,
    title: "לְחִיצָה כְּפוּלָה"
  }, 
];

const mouseSkillsLevelDescriptors = [
  {
    id: MOUSE_SKILL_LEVEL.L0,
    title: "גדולה",
    size: {
      cx: 560, 
      cy: 200,
      r: 75
    }
  },
  {
    id: MOUSE_SKILL_LEVEL.L1,
    title: "בינונית",
    size: {
      cx: 500, 
      cy: 200,
      r: 50
    }
  },
  {
    id: MOUSE_SKILL_LEVEL.L2,
    title: "קטנה",
    size: {
      cx: 500, 
      cy: 200,
      r: 25,
    },
  }
];

export interface MouseSkillsProps {
  eventType: MOUSE_SKILL_TYPE;
}

export const MouseSkillsJumpingShape = (props: MouseSkillsProps) => {
  const image = "frog";
  const imageUrl = MediaUtil.getCatalogImage(image);

  const { 
    audioOn
  } = useContext(GamesContext) as GamesContextType;

  const mouseOnTriangleColor = "#00ffff";

  const svgWidth = 1200;
  const svgHeight = 400;

  const [pendingEventType, setPendingEventType] = useState<MOUSE_SKILL_TYPE>(props.eventType ? props.eventType : MOUSE_SKILL_TYPE.HOVER);
  const [targetPosition, setTargetPosition] = useState<[number,number]>([300,300]);

  const [gameSettingsDisplay, setGameSettingsDisplay] = useState<string>("game-settings-global-hide");
  const [feedbackFace, setFeedbackFace] = useState<FACES>(FACES.NONE);
  const [pendingLevel, setPendingLevel] = useState<MOUSE_SKILL_LEVEL>(MOUSE_SKILL_LEVEL.L0);
  
  const levelLayout = useRef(mouseSkillsLevelDescriptors[0]); // Assumes the first descriptor is the default level
  const shapeSelected = useRef(false);
  const eventType = useRef<MOUSE_SKILL_TYPE>(props.eventType ? props.eventType : MOUSE_SKILL_TYPE.HOVER);

  const defineNextPosition = () => {
    setTargetPosition(() => getRandomPosition());
  }

  const getRandomPosition = (): [number,number] => {
    const d: number = Number(levelLayout.current?.size.r) * 2;

    let x: number = Math.floor(Math.random() * svgWidth);
    x = Math.min(svgWidth - d, Math.max(d, x));
    let y: number = Math.floor(Math.random() * svgHeight);
    y = Math.min(svgHeight - d, Math.max(d, y));

    let nextPosition: [number,number] = [x,y];
    if (nextPosition === targetPosition) {
      nextPosition = [x + 10,y - 5];
    }
    return nextPosition;
  }

  function handleMouseEvent() {
    shapeSelected.current = true;
    setFeedbackFace(() => FACES.HAPPY);
    MediaUtil.play(MediaUtil.pickAudio(PlayListNames.SHORT_HOORAY), audioOn);
    setTimeout(() => {
      setFeedbackFace(() => FACES.NONE);
      shapeSelected.current = false;
      defineNextPosition();
    }, ConstantsUtil.hoorayTimeout)

  }

  function handleSettingsCancel() {
    setPendingEventType(eventType.current);
    setPendingLevel(levelLayout.current.id);
    setGameSettingsDisplay(()=>"game-settings-global-hide"); 
  }

  function handleSettingsDone() {
    eventType.current = pendingEventType;
    let newLayout = mouseSkillsLevelDescriptors.find((d) => d.id === pendingLevel);
    levelLayout.current = newLayout ? newLayout : mouseSkillsLevelDescriptors[0];
    setGameSettingsDisplay(()=>"game-settings-global-hide")
  }

  return(
    <div className="app-page">
      <Banner settings={() => setGameSettingsDisplay("game-settings-global-show")} />

      <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
        <circle cx={targetPosition[0]} cy={targetPosition[1]} r={levelLayout.current.size.r} 
          stroke="#FF7F50" strokeWidth="1" 
          fill="#FAEBD7" 
          className="mouse-skills-shape"
          onMouseEnter={()=> {
            if (eventType.current === MOUSE_SKILL_TYPE.HOVER) {
              handleMouseEvent();
            }
          }} 
          onClick={()=> {
            if (eventType.current === MOUSE_SKILL_TYPE.CLICK) {
              handleMouseEvent();
            }
          }} 
          onDoubleClick={()=> {
            if (eventType.current === MOUSE_SKILL_TYPE.DOUBLE_CLICK) {
              handleMouseEvent();
            }
          }} 
        />
        <image x={targetPosition[0] - (levelLayout.current.size.r * 0.75)} 
          y={targetPosition[1] - (levelLayout.current.size.r * 0.75)} 
          height={levelLayout.current.size.r * 1.5} width={levelLayout.current.size.r * 1.5} 
          href={ imageUrl } 
          className="mouse-skills-shape"
          onMouseEnter={()=> {
            if (eventType.current === MOUSE_SKILL_TYPE.HOVER) {
              handleMouseEvent();
            }
          }} 
          onClick={()=> {
            if (eventType.current === MOUSE_SKILL_TYPE.CLICK) {
              handleMouseEvent();
            }
          }} 
          onDoubleClick={()=> {
            if (eventType.current === MOUSE_SKILL_TYPE.DOUBLE_CLICK) {
              handleMouseEvent();
            }
          }} 
        />
      </svg>

      <FaceFeedback face={ feedbackFace } marginRight="10px" />

      <div id="gameSettings" className={ gameSettingsDisplay }>
        <div>
          <div className="game-settings-title">מִרְדָּף עַכְבָּר</div>

          <div className="game-settings-sub-title">פעולה עם העכבר</div>          
          { mouseEventTypeDescriptors.map(
            (event, i) => 
              <div className="game-settings-entry" key={i}>
                <input type="radio"
                  checked={pendingEventType === event.id} 
                  onChange={(e:ChangeEvent<HTMLInputElement>) => {
                    setPendingEventType(() => event.id);
                  }}></input>
                <span key={i}>{event.title}</span>
              </div>
          )}
          <br/>
          <div className="game-settings-sub-title">גודל הצפרדע</div>          
          { mouseSkillsLevelDescriptors.map(
            (d, i) => 
              <div className="game-settings-entry" key={i}>
                <input type="radio"
                  checked={pendingLevel === d.id} 
                  onChange={(e:ChangeEvent<HTMLInputElement>) => {
                    setPendingLevel(() => d.id);
                  }}></input>
                <span key={i}>{d.title}</span>
              </div>
          )}
          <br/>
          <button className="app-button-primary-sm" onClick={() => {
            handleSettingsDone(); 
          }}>שמור</button>
          <button className="app-button-ghost-sm" onClick={() => {
            handleSettingsCancel();
          }}>בטל</button>
        </div>
      </div>

    </div>
  )
}