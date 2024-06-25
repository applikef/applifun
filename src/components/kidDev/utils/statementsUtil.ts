import { KidDevCode, KidDevCodeBlock, KidDevCodeStatement } from "../kidDevModel";
import { StatementCode } from "./CodeInterpreter";

export const StatementTitle = new Map<StatementCode, string>([
    [StatementCode.JUMP,'זוז']
]);
  
export const MagnitudeTitle = new Map<StatementCode, string>([
    [StatementCode.JUMP,'צעדים']
]);
  
export const DefaultMagnitude = new Map<StatementCode, number>([
    [StatementCode.JUMP,50]
]);

export function updateCodeStatement(code: KidDevCode, newStatement: KidDevCodeStatement): KidDevCode {
    for (let i = 0; i < code.code.length; i++) {
        let block: KidDevCodeBlock = code.code[i];
        for (let j = 0; j < block.statements.length; j++) {
            let s: KidDevCodeStatement = block.statements[j];
            if (s.id === newStatement.id) {
                block.statements[j] = newStatement;
            }
        }
    }
    return code;
};
