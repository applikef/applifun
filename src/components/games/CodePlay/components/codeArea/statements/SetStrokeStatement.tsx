import { ChangeEvent, useContext, useState } from "react";
import { KDCodeStatement } from "../../../model/kidDevModel";
import { StatementCode } from "../../../constants/modelConstants";
import { DefaultStringValue, StatementTitle } from "../../../constants/modelConstants";
import KDContext, { KDContextType } from "../../../model/KDContext";
import { DISPLAY_LEVEL } from "../../../constants/displayLevelConstants";
import './statementLine.css';
import { clearErrors, showError } from "../../../utils/errorsUtil";
import { KD_APP_ERROR_MESSAGES } from "../../../constants/appErrorMessages";
import { CodeValidator } from "../../../model/CodeValidator";

export interface SetStrokeStatementProps {
  statement: KDCodeStatement;
}

export const SetStrokeStatement = (props: SetStrokeStatementProps) => 
{
  const s: KDCodeStatement = props.statement;
  const strokeColor: string = s.stringValue ? 
    s.stringValue 
  : 
    DefaultStringValue.get(StatementCode.SET_STROKE)!;

  const {
    displayLevel,
    setCodeStatement
  } = useContext(KDContext) as KDContextType;  
  
  const [newStroke, setNewStroke] = useState<string>(strokeColor!);
  const [statementBorder, setStatementBorder] = useState<string>("kd-statement-line-correct");

  return(
    <div className={`kd-statement-line ${statementBorder}`}>
      <div className="kd-statement-line-icon">
        <div className="kd-statement-control-bar-color-icon" 
          style={{ "background": newStroke }}>
        </div>
      </div>
      <div className="kd-statement-line-title">{StatementTitle.get(s.name)}</div>
        {displayLevel >= DISPLAY_LEVEL.SET_STROKE_WITH_PARAMS && 
          <div className="kd-statement-line-parameters">
            <div style={{display: "flex"}}>
              <input value={newStroke}
                style={{width: "50px", marginLeft: "8px"}}
                onChange={(e:ChangeEvent<HTMLInputElement>)=>{
                  let newValue = e.target.value;
                  if (CodeValidator.isValidSetStroke(newValue)) {
                    setStatementBorder("kd-statement-line-correct");
                    clearErrors();
                  }
                  else {
                    setStatementBorder("kd-statement-line-error");
                    showError(KD_APP_ERROR_MESSAGES.STROKE_VALUE);
                  }
                  setNewStroke(newValue);
                  s.stringValue = newValue;
                  setCodeStatement(s);}}>
              </input>
            </div>
          </div>
        }     
    </div>
  )
}
  
