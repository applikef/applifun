import { KDCodeStatement } from "../../../model/kidDevModel";
import "./statementLine.css";
import { JumpStatement } from "./JumpStatement";
import { SetStrokeStatement } from "./SetStrokeStatement";
import { StatementCode } from "../../../constants/modelConstants";
import { TurnStatement } from "./TurnStatement";

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
      { props.statement.name === StatementCode.SET_STROKE && 
        <SetStrokeStatement statement={props.statement} /> 
      }
      { (props.statement.name === StatementCode.TURN_DOWN ||
          props.statement.name === StatementCode.TURN_UP ||
          props.statement.name === StatementCode.TURN_RIGHT ||
          props.statement.name === StatementCode.TURN_LEFT
        )
        && 
        <TurnStatement statement={props.statement} /> 
      }
    </div>
    
  )  
}
