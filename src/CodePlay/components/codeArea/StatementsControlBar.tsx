import { useContext, useState } from "react";
import { StrokeColors, StrokeColorsHex } from "../../constants/displayConstants";
import { KDCodeStatement } from "../../model/kidDevModel";
import { StatementCode } from "../../constants/modelConstants";
import { getTimestamp } from "../../utils/generalUtils";
import KDContext, { KDContextType } from "../../model/KDContext";
import { DISPLAY_LEVEL } from "../../constants/displayLevelConstants";
import { KD_APP_STRINGS } from "../../constants/appStrings";
import { DefaultNumberValue } from "../../constants/modelConstants";
import "./codeArea.css";
import { IMAGE_ROOT } from "../../constants/appConstants";

export interface StatementsControlBarProps {
  updateCode: Function;
}

export const StatementsControlBar = (props: StatementsControlBarProps) => 
{  
  const menuEntryIds: Array<string> = [
    "movement",
    "look"
  ];

  const MenuEntries = new Map<string, any>([
    ["movement", {
      id: "movement",
      title: "תנועה",
      showClass: "kd-movement-menu-show",
      hideClass: "kd-movement-menu-hide"
    }],
    ["look", {
      id: "look",
      title: "מראה",
      showClass: "kd-look-menu-show",
      hideClass: "kd-look-menu-hide"
    }]
  ]);

  function hideAllEntries() {
      let e = new Map<string, string>();      
      for (let i=0; i<menuEntryIds.length; i++) {
        e.set(menuEntryIds[i], MenuEntries.get(menuEntryIds[i]).hideClass);
      }
      return(e);
  }

  function showFirstEntry() {
      let e = new Map<string, string>();  
      e.set(menuEntryIds[0], MenuEntries.get(menuEntryIds[0]).showClass);
      for (let i=1; i<menuEntryIds.length; i++) {
        e.set(menuEntryIds[i], MenuEntries.get(menuEntryIds[i]).hideClass);
      }
      return(e);
  }

  const {
    displayLevel,
  } = useContext(KDContext) as KDContextType;

  const [submenusClass, setSubmenusClass] = useState<any>(showFirstEntry())

  const showColorsBar = 
      displayLevel === DISPLAY_LEVEL.JUMP_AND_COLORS_STMTS ? 
      true : false;
  const showJump =
      (displayLevel === DISPLAY_LEVEL.DELETE_AND_JUMP_STATEMENT || displayLevel === DISPLAY_LEVEL.JUMP_AND_COLORS_STMTS) ? 
      true : false;

console.log("display level " + displayLevel + "level " + 
  DISPLAY_LEVEL.JUMP_AND_COLORS_STMTS + "compare " +
  (DISPLAY_LEVEL.JUMP_AND_COLORS_STMTS === displayLevel) + 
    "showColorsBar " + showColorsBar);

  function showSubMenu(menuId: string) {
    let newState = hideAllEntries();
    newState.set(menuId, MenuEntries.get(menuId).showClass);
    setSubmenusClass(newState);
  }

  function addJumpStatement() {
    const jumpStatement: KDCodeStatement = {
      id: getTimestamp(),
      name: StatementCode.JUMP,
      numberValue: DefaultNumberValue.get(StatementCode.JUMP)      
    }; 
    props.updateCode(jumpStatement);
  }

  function addStrokeStatement(strokeHex: string) {
    const setStrokeStatement: KDCodeStatement = {
      id: getTimestamp(),
      name: StatementCode.SET_STROKE,
      stringValue: strokeHex
    }; 
    props.updateCode(setStrokeStatement);
  } 

  function addTurnStatement(angle: number) {
    let turnStatemnetName: StatementCode = StatementCode.TURN;
    switch (angle) {
      case 0:
        turnStatemnetName = StatementCode.TURN_RIGHT;
        break;
      case 90:
        turnStatemnetName = StatementCode.TURN_UP;
        break;
      case 180:
        turnStatemnetName = StatementCode.TURN_LEFT;
        break;
      case 270:
        turnStatemnetName = StatementCode.TURN_DOWN;
        break;
      default: 
        turnStatemnetName = StatementCode.TURN; 
    }

    const turnStatement: KDCodeStatement = {
      id: getTimestamp(),
      name: turnStatemnetName,
      numberValue: angle
    }; 
    props.updateCode(turnStatement);
  }

  return (
    <div className="kd-statement-control-bar-global">
      {displayLevel >= DISPLAY_LEVEL.STATEMENT_GROUPS &&
        <div className="kd-statement-control-main-menu"> {
          menuEntryIds.map((entryId) => 
            <div onClick={() => showSubMenu(entryId)} key={entryId}
              className="kd-statement-control-bar-menu-entry">
              { MenuEntries.get(entryId).title }
            </div>
          )
        }
        </div>
      }
      <div className="kd-statement-control-submenu">
        <div className={showJump ? "" : submenusClass.get("movement")}>
          <div>
            <img src={`${IMAGE_ROOT}/menuEntries/jump32.png`} alt={KD_APP_STRINGS.JUMP}
              title = {KD_APP_STRINGS.JUMP}
              onClick={() => addJumpStatement()}
            />
            { displayLevel >= DISPLAY_LEVEL.TURN_NO_ATTR &&
              <span>
                <img src={`${IMAGE_ROOT}/menuEntries/turnUp32.png`} alt={KD_APP_STRINGS.JUMP}
                  title = {KD_APP_STRINGS.TURN_UP}
                  onClick={() => addTurnStatement(90)}
                />
                <img src={`${IMAGE_ROOT}/menuEntries/turnDown32.png`} alt={KD_APP_STRINGS.JUMP}
                  title = {KD_APP_STRINGS.TURN_DOWN}
                  onClick={() => addTurnStatement(270)}
                />
                <img src={`${IMAGE_ROOT}/menuEntries/turnRight32.png`} alt={KD_APP_STRINGS.JUMP}
                  title = {KD_APP_STRINGS.TURN_RIGHT}
                  onClick={() => addTurnStatement(0)}
                />
                <img src={`${IMAGE_ROOT}/menuEntries/turnLeft32.png`} alt={KD_APP_STRINGS.JUMP}
                  title = {KD_APP_STRINGS.TURN_LEFT}
                  onClick={() => addTurnStatement(180)}
                />
              </span>
            }
          </div>
        </div>
        <div className={showColorsBar ? "" : submenusClass.get("look")}>
        { StrokeColors.map((color, i) => 
            <div className="kd-statement-control-bar-color-icon" 
              key={color}
              style={{ "background": StrokeColorsHex.get(color) }}
              onClick={() => addStrokeStatement(StrokeColorsHex.get(color)!)}>
            </div>
          )
        }
        </div>
      </div>
    </div>
  )
}
