import React, { useContext } from "react";
import GamesContext, { GamesContextType } from "../../../context/GamesContext";
import "./Help.css";

export interface HelpProps {
  onClose: Function;
  baseUrl?: string;
  gameId?: string;
  fileName?: string;
}

export const Help = (props: HelpProps) => {
  const {
    isTablet,
  } = useContext(GamesContext) as GamesContextType;

  const baseUrl = props.baseUrl ? props.baseUrl : "";
  const fileName = props.gameId ? `${props.gameId}.html` : props.fileName;
  const smallDevice = isTablet;

  function hasHelp():boolean {
    if (props.gameId !== undefined && props.gameId.length > 0) { 
      return true;
    }
    return false;
  }

  return(
    <div>
      { hasHelp() &&
        <div className="app-show-flex-column"> 
          <span className="help-close app-clickable" onClick={() => props.onClose()}>סגור חלון</span>
          <iframe title="mouseJumpingShapeClick" 
            src={`${baseUrl}resources/help/${fileName}`} 
            height={smallDevice ? "250px" : "500px"} 
            width={smallDevice ? "500px" : "1000px"}
          />
        </div>
      }
    </div>
  )
}