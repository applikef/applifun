import { ChangeEvent, useContext, useState } from "react";
import { KDCodeStatement } from "../../../model/kidDevModel";
import { DefaultNumberValue, NumberValueTitle, StatementCode, StatementTitle } from "../../../constants/modelConstants";
import KDContext, { KDContextType } from "../../../model/KDContext";
import { DISPLAY_LEVEL } from "../../../constants/displayLevelConstants";
import './statementLine.css';
import { KD_APP_ERROR_MESSAGES } from "../../../constants/appErrorMessages";
import { clearErrors, showError } from "../../../utils/errorsUtil";
import { CodeValidator } from "../../../model/CodeValidator";
import { IMAGE_ROOT } from "../../../constants/appConstants";

export interface SetStrokeWidthStatementProps {
  statement: KDCodeStatement;
}

export const SetStrokeWidthStatement = (props: SetStrokeWidthStatementProps) => 
{
  const s: KDCodeStatement = props.statement;
  const {
    displayLevel,
    setCodeStatement
  } = useContext(KDContext) as KDContextType;
 
  const width = (s.numberValue !== undefined && s.numberValue > 0) ? 
    s.numberValue! 
  : 
    DefaultNumberValue.get(StatementCode.SET_STROKE_WIDTH)!;
  const [numberInput, setNumberInput] = useState<number>(width);

  const [statementBorder, setStatementBorder] = useState<string>("kd-statement-line-correct");

  return (
    <div className={`kd-statement-line ${statementBorder}`}>
      <div className="kd-statement-line-icon">
        <img src={`${IMAGE_ROOT}/statementIcons/strokeWidth32.png`} 
          className="banner-icon" 
          title="רוחב עיפרון"  alt="רוחב עיפרון"/>
      </div>
      <div className="kd-statement-line-title">{StatementTitle.get(s.name)}</div>
        <div className="kd-statement-line-parameters">
          <div style={{display: "flex"}}>
            <input value={numberInput}
              style={{width: "50px", marginLeft: "8px"}}
              onChange={(e:ChangeEvent<HTMLInputElement>)=>{
                let newValue = Number(e.target.value);
                if (CodeValidator.isValidSetStrokeWidth(newValue)) {
                  setStatementBorder("kd-statement-line-correct");
                  clearErrors();
                }
                else {
                  showError(KD_APP_ERROR_MESSAGES.STROKE_WIDTH_VALUE);
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
    </div>
  )
}