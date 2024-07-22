import { ChangeEvent, useContext, useState } from "react";
import { KDCodeStatement } from "../../../model/kidDevModel";
import { NumberValueTitle, StatementTitle } from "../../../constants/modelConstants";
import KDContext, { KDContextType } from "../../../model/KDContext";
import { DISPLAY_LEVEL } from "../../../constants/displayLevelConstants";
import './statementLine.css';
import { KD_APP_ERROR_MESSAGES } from "../../../constants/appErrorMessages";
import { clearErrors, showError } from "../../../utils/errorsUtil";
import { CodeValidator } from "../../../model/CodeValidator";
import { getTurnStatementIcon, getTurnStatementTitle } from "../../../utils/displayUtils";

export interface TurnStatementProps {
  statement: KDCodeStatement;
}

export const TurnStatement = (props: TurnStatementProps) => 
{
  const s: KDCodeStatement = props.statement;
  const {
    displayLevel,
    setCodeStatement
  } = useContext(KDContext) as KDContextType;
 
  const [numberInput, setNumberInput] = useState<number>(
    (s.numberValue !== undefined && s.numberValue > 0) ? s.numberValue : 0
  );
  const [statementBorder, setStatementBorder] = useState<string>("kd-statement-line-correct");

    return (
    <div className={`kd-statement-line ${statementBorder}`}>
      <div className="kd-statement-line-icon">
        <img src={getTurnStatementIcon(s.name)} className="banner-icon" 
          title={getTurnStatementTitle(s.name)}  alt={getTurnStatementTitle(s.name)}/>
      </div>
      <div className="kd-statement-line-title">{StatementTitle.get(s.name)}</div>
      {displayLevel <= DISPLAY_LEVEL.TURN_NO_ATTR ?
        <div></div>
      : <div className="kd-statement-line-parameters">
          <div style={{display: "flex"}}>
            <input value={numberInput}
              style={{width: "50px", marginLeft: "8px"}}
              onChange={(e:ChangeEvent<HTMLInputElement>)=>{
                let newValue = Number(e.target.value);
                if (CodeValidator.isValidJump(newValue)) {
                  setStatementBorder("kd-statement-line-correct");
                  clearErrors();
                }
                else {
                  showError(KD_APP_ERROR_MESSAGES.JUMP_NUMBER);
                  setStatementBorder("kd-statement-line-error");
                  newValue = 0;
                }
                setNumberInput(newValue); 
                s.numberValue = newValue;
                setCodeStatement(s);}}>
            </input>
            {NumberValueTitle.get(s.name) ? NumberValueTitle.get(s.name) : ""}
          </div>
        </div>
      }
    </div>
  )
}