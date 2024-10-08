import { ChangeEvent, useContext, useState } from "react";
import { KDCodeStatement } from "../../../model/kidDevModel";
import { NumberValueTitle, StatementTitle } from "../../../constants/modelConstants";
import KDContext, { KDContextType } from "../../../model/KDContext";
import './statementLine.css';
import { KD_APP_ERROR_MESSAGES } from "../../../constants/appErrorMessages";
import { clearErrors, showError } from "../../../utils/errorsUtil";
import { CodeValidator } from "../../../model/CodeValidator";
import { IMAGE_ROOT } from "../../../constants/appConstants";

export interface SetPencilPositionStatementProps {
  statement: KDCodeStatement;
}

export const SetPencilPositionStatement = (props: SetPencilPositionStatementProps) => 
{
  const s: KDCodeStatement = props.statement;
  const {
    setCodeStatement
  } = useContext(KDContext) as KDContextType;
 
  const x = s.numberValues![0]!;
  const y = s.numberValues![1]!;

  const [xInput, setXInput] = useState<number>(x);
  const [yInput, setYInput] = useState<number>(y);

  const [statementBorder, setStatementBorder] = useState<string>("kd-statement-line-correct");

  let newX: number;
  let newY: number;

  return (
    <div className={`kd-statement-line ${statementBorder}`}>
      <div className="kd-statement-line-icon">
        <img src={`${IMAGE_ROOT}/statementIcons/setPosition32.png`} 
          className="banner-icon" 
          title="מקום עיפרון"  alt="מקום עיפרון"/>
      </div>
      <div className="kd-statement-line-title">{StatementTitle.get(s.name)}</div>

      <div className="kd-statement-line-parameters">
        <div style={{display: "flex"}}>
          <input value={yInput}
            className="kd-statement-line-input-number"
            style={{marginLeft: "0px"}}
            onChange={(e:ChangeEvent<HTMLInputElement>)=>{
              newY = Number(e.target.value);
              if (CodeValidator.isValidSetPencilPosition([newX ? newX : x, newY])) {
                setStatementBorder("kd-statement-line-correct");
                clearErrors();
              }
              else {
                showError(KD_APP_ERROR_MESSAGES.PENCIL_POSITION_Y);
                setStatementBorder("kd-statement-line-error");
                newY = 0;
              }
              setYInput(newY); 
              s.numberValues = [newX ? newX : x, newY];
              setCodeStatement(s);}}>
          </input>
          =Y
          <input value={xInput}
            className="kd-statement-line-input-number"
            style={{marginLeft: "0px", marginRight: "4px"}}
            onChange={(e:ChangeEvent<HTMLInputElement>)=>{
              newX = Number(e.target.value);
              if (CodeValidator.isValidSetPencilPosition([newX,newY ? newY : y])) {
                setStatementBorder("kd-statement-line-correct");
                clearErrors();
              }
              else {
                showError(KD_APP_ERROR_MESSAGES.PENCIL_POSITION_X);
                setStatementBorder("kd-statement-line-error");
                newX = 0;
              }
              setXInput(newX); 
              s.numberValues = [newX,newY ? newY : y];
              setCodeStatement(s);}}>
          </input>
          =X
          {NumberValueTitle.get(s.name) ? NumberValueTitle.get(s.name) : ""}
        </div>
      </div>
    </div>
  )
}