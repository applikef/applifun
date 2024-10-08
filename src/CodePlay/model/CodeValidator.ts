import { DISPLAY_AREA_HEIGHT, DISPLAY_AREA_WIDTH } from "../constants/displayConstants";
import { StatementCode } from "../constants/modelConstants";
import { MAX_STROKE_WIDTH } from "./KDPencil";
import { KDCodeStatement } from "./kidDevModel";

export class CodeValidator {
   public static isValid(s: KDCodeStatement): boolean {
    switch (s.name) {
      case StatementCode.JUMP:
        return CodeValidator.isValidJump(
          s.numberValues ? s.numberValues[0] : undefined);
      case StatementCode.SET_PENCIL_POSITION:
        return CodeValidator.isValidSetPencilPosition(s.numberValues );
      case StatementCode.SET_STROKE:
        return CodeValidator.isValidSetStroke(s.stringValue); 
      case StatementCode.TURN_DOWN:
        return CodeValidator.isValidTurn(
          s.numberValues ? s.numberValues[0] : undefined, 270);
      default: return true;
    }
  }

  public static isValidJump(value: number | undefined): boolean {
    if (value === undefined) {
      return false;
    }

    if (isNaN(value) || value < 0) {
      return false;
    }
    return true;
  }

  public static isValidSetPencilPosition(values: Array<number> | undefined): boolean {
    if (values === undefined) {
      return false;
    }

    if (values[0] === undefined || values[1] === undefined ||
      isNaN(values[0]) || isNaN(values[1]) || 
      values[0] < 0 || values[1] < 0 ||
      values[0] > DISPLAY_AREA_WIDTH || values[1] > DISPLAY_AREA_HEIGHT) {
        return false;
    }
    
    return true;
  }

  public static isValidSetStroke(color: string | undefined): boolean {
    if (color === undefined) {
      return false;
    }
    
    if (color.substring(0,1) !== "#")
      return false;

    for (let i=1; i < color.length; i++) {
      if ("0123456789abcdef".indexOf(color.substring(i,i+1)) === -1)
        return false;
    }
    return true;
  }

  public static isValidSetStrokeWidth(value: number | undefined): boolean {
    if (value === undefined) {
      return false;
    }

    if (isNaN(value) || value < 0 || value > MAX_STROKE_WIDTH) {
      return false;
    }
    return true;
  }

  public static isValidTurn(value:number | undefined, expectedNumber?: number) {
    if (value === undefined) {
      return false;
    }
    
    if (expectedNumber) {
      if (value === expectedNumber) {
        return true;
      }
      else {
        return false;
      }
    }
    else {
      if (value >= 0 && value < 360) {
        return true;
      }
      else {
        return false;
      }
    }
  }
}