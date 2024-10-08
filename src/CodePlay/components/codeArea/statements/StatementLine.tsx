import { KDCodeStatement } from "../../../model/kidDevModel";
import "./statementLine.css";
import { JumpStatement } from "./JumpStatement";
import { SetStrokeStatement } from "./SetStrokeStatement";
import { StatementCode } from "../../../constants/modelConstants";
import { TurnStatement } from "./TurnStatement";
import { SetStrokeWidthStatement } from "./SetStrokeWidthStatement";
import { SetPencilPositionStatement } from "./SetPencilPositionStatement";
import { isTurnStatement } from "../../../utils/codeUtil";

export interface StatementLineProps {
  statement: KDCodeStatement;
}

export const StatementLine = (props: StatementLineProps) => 
{
  return(
    <div>
      { props.statement.name === StatementCode.JUMP && 
        <JumpStatement statement={props.statement} />
      }
      { props.statement.name === StatementCode.SET_PENCIL_POSITION && 
        <SetPencilPositionStatement statement={props.statement} /> 
      }
      { props.statement.name === StatementCode.SET_STROKE && 
        <SetStrokeStatement statement={props.statement} /> 
      }
      { props.statement.name === StatementCode.SET_STROKE_WIDTH && 
        <SetStrokeWidthStatement statement={props.statement} /> 
      }
      { isTurnStatement(props.statement.name) && 
        <TurnStatement statement={props.statement} /> 
      }
    </div>
    
  )  
}
