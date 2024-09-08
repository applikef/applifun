import { KD_APP_STRINGS } from "./appStrings";
import { StrokeColors, StrokeColorsHex } from "./displayConstants";

export enum StatementCode {
  JUMP,
  TURN,
  TURN_UP,
  TURN_DOWN,
  TURN_LEFT,
  TURN_RIGHT,
  SET_PENCIL_POSITION,
  SET_STROKE,
  SET_STROKE_WIDTH
}

export const StatementTitle = new Map<StatementCode, string>([
  [StatementCode.JUMP, KD_APP_STRINGS.JUMP],
  [StatementCode.SET_STROKE, KD_APP_STRINGS.PENCIL_COLOR],
  [StatementCode.SET_STROKE_WIDTH, KD_APP_STRINGS.PENCIL_WIDTH],
  [StatementCode.TURN_UP, KD_APP_STRINGS.TURN_UP],
  [StatementCode.TURN_DOWN, KD_APP_STRINGS.TURN_DOWN],
  [StatementCode.TURN_RIGHT, KD_APP_STRINGS.TURN_RIGHT],
  [StatementCode.TURN_LEFT, KD_APP_STRINGS.TURN_LEFT],
  [StatementCode.TURN, KD_APP_STRINGS.TURN_TO_ANGLE]
]);

export const NumberValueTitle = new Map<StatementCode, string>([
  [StatementCode.JUMP,'צעדים'],
  [StatementCode.TURN,'מעלות']
]);

export const DefaultNumberValues = new Map<StatementCode, Array<number>>([
  [StatementCode.JUMP,[50]],
  [StatementCode.SET_PENCIL_POSITION, [0,0]],
  [StatementCode.SET_STROKE_WIDTH,[1]],
  [StatementCode.TURN,[45]]
]);

export const DefaultStringValue = new Map<StatementCode, string>([
  [StatementCode.SET_STROKE,StrokeColorsHex.get(StrokeColors.GREEN)!]
]);



