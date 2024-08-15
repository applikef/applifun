import { useContext } from "react";
import KDContext, { KDContextType } from "./model/KDContext";
import { initCode } from "./utils/codeUtil";
import "./../assets/styles/codePlay.css";
import { Banner } from "../components/global/Banner/Banner";
import { getHelpFileName } from "./utils/helpUtil";
import { CodeInterpreter } from "./model/CodeInterpreter";
import { NO_OF_LEVELS } from "./constants/appConstants";
import { CodeArea } from "./components/codeArea/CodeArea";
import { DisplayArea } from "./components/displayArea/DisplayArea";
import { DisplayLevelTitles } from "./constants/displayLevelConstants";

export const CodePlay = () => 
{  
  const { 
    displayLevel,
    setDisplayLevel,
    setCode
  } = useContext(KDContext) as KDContextType;

  function handleLevelSelected(level: number) {
    setCode(initCode(level));
    setDisplayLevel(level);
    (new CodeInterpreter()).reset();
  }

  return(
    <div className="app-page">
      <Banner gameId={"codePlay"} 
        hideAudio={ true }
        helpFile={ getHelpFileName(displayLevel)}/>

      <div className="kd-levels-bar">
        <div className="kd-levels-bar-entries">
        { Array.from(Array(NO_OF_LEVELS).keys()).map(
            (level) => 
              <div className="kd-levels-bar-entry" key={level}
                onClick={() => {
                  handleLevelSelected(level);
                }}>
                <span id={`level${level.toString()}`} key={level}
                  className={displayLevel === level ? "app-font-highlight" : ""}>
                  {`שָׁלָב ${level}`}
                </span>
              </div>
        )}
        </div>
        <div className="kd-levels-bar-display-level-title">
          שלב {displayLevel}: {DisplayLevelTitles.get(displayLevel)}
        </div>
        <div className="kd-levels-bar-hr-block">
          <hr className="kd-levels-bar-hr"/>
        </div>
      </div>

      <div className="kd-home">
        {/* <Workbench /> */}
        <div className="kd-workbench">
          <CodeArea></CodeArea>
          <DisplayArea></DisplayArea>
        </div>
      </div>
    </div>
  )
}
