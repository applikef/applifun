import { DISPLAY_LEVEL } from "../constants/displayLevelConstants";

export function getHelpFileName(helpPageId: number) {
  let fileName = `codePlay/`;
  switch (helpPageId) {
    case DISPLAY_LEVEL.JUMP_NO_ATTR:
      fileName += "jump";
      break;
    case DISPLAY_LEVEL.JUMP:
      fileName += "jumpWithParameters";
      break;
    case DISPLAY_LEVEL.RESET:
      fileName += "resetDisplay";
      break;
    case DISPLAY_LEVEL.DELETE_AND_JUMP_STATEMENT:
      fileName += "deleteAndAddStatement";
      break;
    case DISPLAY_LEVEL.JUMP_AND_COLORS_STMTS:
      fileName += "stroke";
      break;
    case DISPLAY_LEVEL.STATEMENT_GROUPS:
      fileName += "statementGroups";
      break;
    case DISPLAY_LEVEL.SET_STROKE_WITH_PARAMS:
      fileName += "strokeWithParameters";
      break;
    case DISPLAY_LEVEL.TURN_NO_ATTR:
      fileName += "turn";
      break;
    case DISPLAY_LEVEL.TURN_TO_ANGLE:
      fileName += "turnToAngle";
      break;
    case DISPLAY_LEVEL.OTHER:
      fileName += "noHelp";
      break;
    default: 
      fileName += "noHelp";
    }
    fileName += ".html";
    return fileName;
}