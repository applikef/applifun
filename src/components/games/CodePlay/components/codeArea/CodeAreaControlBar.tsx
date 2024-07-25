import { useContext } from "react";
import KDContext, { KDContextType } from "./../../model/KDContext";
import { CodeInterpreter } from "../../model/CodeInterpreter";
import { DISPLAY_LEVEL } from "../../constants/displayLevelConstants";
import "./../../../../../assets/styles/codePlay.css";
import { IMAGE_ROOT } from "../../constants/appConstants";

export interface CodeAreaControlBarProps {

}

export const CodeAreaControlBar = (props: CodeAreaControlBarProps) => 
{  
  const {displayLevel,
    code
  } = useContext(KDContext) as KDContextType;
  const interpreter = new CodeInterpreter();

  return(
    <div className="kd-code-area-control-bar">
      <img src={`${IMAGE_ROOT}/play32.png`} className="kd-code-area-control-bar-icon app-clickable"
        title="בצע"  alt="בצע"
        onClick={() => interpreter.execute(code)}/>
      { displayLevel >= DISPLAY_LEVEL.RESET &&
        <img src={`${IMAGE_ROOT}/reset32.png`} className="kd-code-area-control-bar-icon app-clickable"
          title="מחק הכל"  alt="מחק הכל"
          onClick={() => interpreter.reset()}/>
      }
      <div id="messageArea" className="kd-code-area-message-area">
      </div>
    </div>
  )
}

