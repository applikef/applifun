import { ChangeEvent, useContext, useState } from "react";
import KDContext, { KDContextType } from "./model/KDContext";
import { Workbench } from "./components/Workbenck";
import { initCode } from "./utils/codeUtil";
import "./../../../assets/styles/codePlay.css";
import { Banner } from "../../global/Banner/Banner";
import { getHelpFileName } from "./utils/helpUtil";
import { CodeInterpreter } from "./model/CodeInterpreter";

export const CodePlay = () => 
{  
  const context = useContext(KDContext) as KDContextType;
  const { 
    displayLevel,
    setDisplayLevel,
    setCode
  } = useContext(KDContext) as KDContextType;

  const MAX_STEP = 8;

  const [gameSettingsDisplay, setGameSettingsDisplay] = useState<string>("game-settings-global-hide");
  const [pendingStep, setPendingStep] = useState<number>(displayLevel);

  function handleSettingsCancel() {
    setGameSettingsDisplay(()=>"game-settings-global-hide"); 
  }

  function handleSettingsDone() {
    (new CodeInterpreter(context)).reset();
    setCode(initCode(pendingStep));
    setDisplayLevel(pendingStep);
    setGameSettingsDisplay(()=>"game-settings-global-hide")
  }

  return(
    <div className="app-page">
      <Banner gameId={"codePlay"} 
        settings={() => setGameSettingsDisplay("game-settings-global-show")}
        hideAudio={ true }
        helpFile={ getHelpFileName(displayLevel.toString())}/>

      <div className="kd-home">
        <Workbench />
      </div>

      <div className={ gameSettingsDisplay }>
        { Array.from(Array(MAX_STEP).keys()).map(
            (step) => 
              <div className="game-settings-entry" key={step}>
                <input type="radio"
                  checked={pendingStep === step} 
                  onChange={(e:ChangeEvent<HTMLInputElement>) => {
                    setPendingStep(() => step);
                  }}></input>
                <span key={step}>{`שָׁלָב ${step}`}</span>
              </div>
          )}
          <br/>
          <button className="app-button-primary-sm" onClick={(e) => {
            handleSettingsDone(); 
          }}>התחל</button>
          <button className="app-button-ghost-sm" onClick={() => {
            handleSettingsCancel();
          }}>בטל</button>

      </div>

    </div>
  )
}
