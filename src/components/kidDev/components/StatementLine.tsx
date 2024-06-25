import "./../kidDev.css";
import { KidDevCodeStatement } from "../kidDevModel";
import { MagnitudeTitle, StatementTitle } from "../utils/statementsUtil";
import { ChangeEvent, useContext, useState } from "react";
import KidDevContext, { KidDevContextType } from "../KidDevContext";

export interface StatementLineProps {
  statement: KidDevCodeStatement;
  readOnly: boolean;
}

export const StatementLine = (props: StatementLineProps) => 
{
  const {
    setCodeStatement
  } = useContext(KidDevContext) as KidDevContextType;

  const s: KidDevCodeStatement = props.statement;
  const [numberInput, setNumberInput] = useState<number>(
    (s.magnitude !== undefined && s.magnitude > 0) ? s.magnitude : 0
  );

  return(
    <tr className="kd-statement-line">
      <td className="kd-statement-line-icon">
        <img src="resources/kidDev/jump32.png" className="banner-icon" 
          title="קפוץ"  alt="קפוץ"/>
      </td>
      <td style={{paddingLeft: "8px"}}>{StatementTitle.get(s.name)}</td>
      {props.readOnly ?
        <td>{s.magnitude ? `${s.magnitude} ${MagnitudeTitle.get(s.name) ? MagnitudeTitle.get(s.name) : ""}` : ""}</td>
      : <td>
          <div style={{display: "flex"}}>
            <input value={numberInput}
              style={{width: "50px", marginLeft: "8px"}}
              onChange={(e:ChangeEvent<HTMLInputElement>)=>{
                const newValue = Number(e.target.value);
                setNumberInput(newValue); 
                s.magnitude = newValue;
                setCodeStatement(s);}}>
            </input>
            {MagnitudeTitle.get(s.name) ? MagnitudeTitle.get(s.name) : ""}
          </div>
        </td>
      }
    </tr>
  )  
}
