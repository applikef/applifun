import { useContext, useEffect, useState } from "react";
import KDContext, { KDContextType } from "../../model/KDContext";
import { StatementLine } from "./statements/StatementLine";
import { CodeAreaControlBar } from "./CodeAreaControlBar";
import { DISPLAY_LEVEL } from "../../constants/displayLevelConstants";
import { StatementsControlBar } from "./StatementsControlBar";
import { KDCode, KDCodeStatement } from "../../model/kidDevModel";
import { addStatement, deleteStatement, getNumberOfStatements, initCode } from "../../utils/codeUtil";
import { IMAGE_ROOT } from "../../constants/appConstants";
import "./codeArea.css";

export interface CodeAreaProps {

}

export const CodeArea = (props: CodeAreaProps) => 
{  
  const {
    displayLevel,
    code,
    setCode
  } = useContext(KDContext) as KDContextType;

  let activeCode: KDCode = code;
  let length = -1;
  if (!code.code[0] || !code.code[0].statements || code.code[0].statements.length === 0) {
    activeCode = initCode(displayLevel);
    length = activeCode.code[0].statements.length;
  }
  else {
    length = activeCode.code[0].statements.length;
  }

  const [codeLength, setCodeLength] = useState<number>(length);
  useEffect(() => {
    setCode(activeCode);
  }, [activeCode, setCode]);

  function updateCode(newStatement: KDCodeStatement) {
    activeCode = addStatement(activeCode, newStatement);
    setCodeLength(getNumberOfStatements(activeCode));
  }

  function deleteSelectedStatement(statement: KDCodeStatement) {
    activeCode = deleteStatement(activeCode, statement);
    setCodeLength(getNumberOfStatements(activeCode));
  }

  return(
    <div className="kd-code">
      <CodeAreaControlBar></CodeAreaControlBar>
      <div className="kd-code-area-work-area">
        {displayLevel >= DISPLAY_LEVEL.DELETE_AND_JUMP_STATEMENT &&
          <StatementsControlBar updateCode={updateCode}></StatementsControlBar>
        }
        <div className="kd-code-area">
        { codeLength > 0 &&
          activeCode.code.map((block)=>block.statements.map((s,i)=>
            <div className="kd-statement-line-global" key={i}>
              { displayLevel >= DISPLAY_LEVEL.DELETE_AND_JUMP_STATEMENT &&
                <div className="kd-statement-line-icons">
                  <img src={`${IMAGE_ROOT}/delete32.png`} alt="מחק" height={24}
                    onClick={() => deleteSelectedStatement(s)}/>
                </div>
              }
              <StatementLine statement={s} key={i} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}