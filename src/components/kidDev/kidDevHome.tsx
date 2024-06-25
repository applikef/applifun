import { useContext, useState } from "react";
import KidDevContext, { KidDevContextType } from "./KidDevContext";

import { Workbench } from "./Workbenck";

import "./kidDev.css";
import { KidDevBanner } from "./KidDevBanner";
import { StatementCode } from "./utils/CodeInterpreter";
import { DISPLAY_LEVEL } from "./utils/displayLevelUtil";

export interface KidDevProps {

}

export const KidDev = (props: KidDevProps) => 
{  
  const { 
    displayLevel,
    setDisplayLevel,
    setCode
  } = useContext(KidDevContext) as KidDevContextType;

  const [settingsDisplay, setSettingsDisplay] = useState<string>("settings-display-hide");
  let newDisplayLevel = displayLevel;

  function initCode() {
    if (newDisplayLevel === DISPLAY_LEVEL.JUMP_NO_ATTR) {
      setCode({code: [{statements: [{
        id: '1',
        name: StatementCode.JUMP
      }]}]});
    }  
    else if (newDisplayLevel === DISPLAY_LEVEL.JUMP_READ_ONLY || newDisplayLevel === DISPLAY_LEVEL.JUMP) {
      setCode({code: [{statements: [{
        id: '1',
        name: StatementCode.JUMP,
        magnitude: 20
      }]}]});
    }
    else {
      alert('מסך זה עדיין לא קיים');
    }
  }

  return(
    <div className="app-page">
      <KidDevBanner settings={() => setSettingsDisplay("settings-display-show")}></KidDevBanner>
      <div className="kid-dev-home">
        <Workbench />
      </div>

      <div className={`settings-area ${settingsDisplay}`}>
        <span style={{paddingLeft: "10px"}}>רמה</span>          
        <input value={ displayLevel } 
          type="number" 
          min="0"
          style={{ width: "50px" }}
          onChange={ (e) => {
            newDisplayLevel = Number(e.target.value);
            initCode();
            setDisplayLevel(newDisplayLevel);
          }} />
        <div style={{marginTop: "8px"}}>
          <button className="app-button-ghost-sm" onClick={() => {
            setSettingsDisplay("settings-display-hide");
          }}>סגור</button>
        </div>
      </div>
    </div>
  )
}
