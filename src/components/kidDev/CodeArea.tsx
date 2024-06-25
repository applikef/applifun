import { useContext } from "react";
import "./kidDev.css";
import KidDevContext, { KidDevContextType } from "./KidDevContext";
import { StatementLine } from "./components/StatementLine";
import { ExecuteCode } from "./components/RunCode";
import { DISPLAY_LEVEL } from "./utils/displayLevelUtil";

export interface CodeAreaProps {

}

export const CodeArea = (props: CodeAreaProps) => 
{  
  const {
    displayLevel,
    code,
  } = useContext(KidDevContext) as KidDevContextType;

  return(
    <div className="kid-dev-code">
      <ExecuteCode></ExecuteCode>
      <table className="kd-code-area"><tbody>
      {
        code.code.map((block)=>block.statements.map((s,i)=>
          <StatementLine statement={s} readOnly={displayLevel < DISPLAY_LEVEL.JUMP} key={i} />))
      }
      </tbody></table>
    </div>
  )
}