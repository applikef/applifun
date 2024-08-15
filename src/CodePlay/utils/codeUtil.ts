import { DISPLAY_LEVEL } from "../constants/displayLevelConstants";
import { DefaultNumberValues, DefaultStringValue, StatementCode } from "../constants/modelConstants";
import { KDCode, KDCodeBlock, KDCodeStatement } from "../model/kidDevModel";

export function initCode(displayLevel: number): KDCode {
    if (displayLevel === DISPLAY_LEVEL.JUMP_NO_ATTR) {
      return ({code: [{statements: [{
        id: '1',
        name: StatementCode.JUMP,
        numberValues: DefaultNumberValues.get(StatementCode.JUMP)
      }]}]});
    }  
    else if (displayLevel === DISPLAY_LEVEL.JUMP) {
      return ({code: [{statements: [{
        id: '1',
        name: StatementCode.JUMP,
        numberValues: DefaultNumberValues.get(StatementCode.JUMP)
      }]}]});
    }
    else if (displayLevel === DISPLAY_LEVEL.DELETE_AND_JUMP_STATEMENT) {
      return ({code: [{statements: [{
        id: '1',
        name: StatementCode.JUMP,
        numberValues: [100]
      }]}]});
    }
    else if (displayLevel >= DISPLAY_LEVEL.JUMP_AND_COLORS_STMTS &&
      displayLevel < DISPLAY_LEVEL.TURN_NO_ATTR) {
      return ({code: [{statements: [
        {
          id: '1',
          name: StatementCode.SET_STROKE,
          stringValue: DefaultStringValue.get(StatementCode.SET_STROKE)
        },      
        {
        id: '2',
        name: StatementCode.JUMP,
        numberValues: DefaultNumberValues.get(StatementCode.JUMP)
      }]}]});
    }
    else if (displayLevel === DISPLAY_LEVEL.TURN_NO_ATTR) {
      return ({code: [{statements: [
        {
          id: '1',
          name: StatementCode.SET_STROKE,
          stringValue: DefaultStringValue.get(StatementCode.SET_STROKE)
        },      
        {
          id: '2',
          name: StatementCode.JUMP,
          numberValues: DefaultNumberValues.get(StatementCode.JUMP)
        },
        {
          id: '3',
          name: StatementCode.TURN_UP,
          numberValues: [90]
        },
        {
          id: '4',
          name: StatementCode.SET_STROKE,
          stringValue: "#ff0000"
        },
        {
          id: '5',
          name: StatementCode.JUMP,
          numberValues: DefaultNumberValues.get(StatementCode.JUMP)
        }
    ]}]});
    }
    else if (displayLevel === DISPLAY_LEVEL.TURN_TO_ANGLE) {
      return ({code: [{statements: [
        {
          id: '1',
          name: StatementCode.SET_STROKE,
          stringValue: DefaultStringValue.get(StatementCode.SET_STROKE)
        },      
        {
          id: '3',
          name: StatementCode.TURN,
          numberValues: DefaultNumberValues.get(StatementCode.TURN)
        },
        {
          id: '2',
          name: StatementCode.JUMP,
          numberValues: DefaultNumberValues.get(StatementCode.JUMP)
        }
    ]}]});
    }
    else if (displayLevel === DISPLAY_LEVEL.SET_STROKE_WIDTH) {
      return ({code: [{statements: [
        {
          id: '1',
          name: StatementCode.SET_STROKE,
          stringValue: DefaultStringValue.get(StatementCode.SET_STROKE)
        },      
        {
          id: '2',
          name: StatementCode.JUMP,
          numberValues: DefaultNumberValues.get(StatementCode.JUMP)
        },
        {
          id: '3',
          name: StatementCode.SET_STROKE,
          stringValue: "#ff0000"
        },      
        {
          id: '4',
          name: StatementCode.SET_STROKE_WIDTH,
          numberValues: [5]
        },      
        {
          id: '5',
          name: StatementCode.JUMP,
          numberValues: DefaultNumberValues.get(StatementCode.JUMP)
        },
        {
          id: '6',
          name: StatementCode.SET_STROKE,
          stringValue: "#0000ff"
        },      
        {
          id: '7',
          name: StatementCode.SET_STROKE_WIDTH,
          numberValues: [10]
        },      
        {
          id: '8',
          name: StatementCode.JUMP,
          numberValues: DefaultNumberValues.get(StatementCode.JUMP)
        }
    ]}]});
    }
    else if (displayLevel === DISPLAY_LEVEL.SET_PENCIL_POSITION) {
      return ({code: [{statements: [{
        id: '1',
        name: StatementCode.JUMP,
        numberValues: DefaultNumberValues.get(StatementCode.JUMP)
      },
      {
        id: '2',
        name: StatementCode.SET_PENCIL_POSITION,
        numberValues: [300,100]
      },
      {
        id: '3',
        name: StatementCode.JUMP,
        numberValues: DefaultNumberValues.get(StatementCode.JUMP)
      }
    ]}]});
    }  
    else {
      return ({code: [{statements: [{
        id: '1',
        name: StatementCode.JUMP,
        numberValues: [100]
      }]}]});
    }
  }


export function updateCodeStatement(code: KDCode, newStatement: KDCodeStatement): KDCode {
    for (let i = 0; i < code.code.length; i++) {
        let block: KDCodeBlock = code.code[i];
        for (let j = 0; j < block.statements.length; j++) {
            let s: KDCodeStatement = block.statements[j];
            if (s.id === newStatement.id) {
                block.statements[j] = newStatement;
            }
        }
    }
    return code;
};

export function addStatement(code: KDCode, newStatement: KDCodeStatement,
  blockIndex?: number, statementIndex?: number): KDCode {
    let blockStatements: KDCodeStatement[] = 
      code.code[blockIndex ? blockIndex : 0].statements;
    blockStatements.splice((statementIndex ? statementIndex : blockStatements.length), 
      0, newStatement);
    return code;
};

export function deleteStatement(code: KDCode, statement: KDCodeStatement): KDCode {
    for (let i=0; i < code.code.length; i++) {
        let blockStatements = code.code[i].statements;
        for (let j=0; j < blockStatements.length; j++) {
            let codeStatement = blockStatements[j];
            if (codeStatement.id === statement.id) {
                blockStatements.splice(j, 1);
            }
        }
    }
    return code;
};

export function getNumberOfStatements(code: KDCode): number {
    let count: number = 0;
    for (let i=0; i < code.code.length; i++) {
        count += code.code[i].statements.length;
    }
    return count;
}