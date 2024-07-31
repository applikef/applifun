import { KD_APP_STRINGS } from "./appStrings";

export enum StatementCode {
  JUMP,
  TURN,
  TURN_UP,
  TURN_DOWN,
  TURN_LEFT,
  TURN_RIGHT,
  SET_STROKE
}

export const StatementTitle = new Map<StatementCode, string>([
  [StatementCode.JUMP, KD_APP_STRINGS.JUMP],
  [StatementCode.SET_STROKE, KD_APP_STRINGS.PENCIL_COLOR],
  [StatementCode.TURN_UP, KD_APP_STRINGS.TURN_UP],
  [StatementCode.TURN_DOWN, KD_APP_STRINGS.TURN_DOWN],
  [StatementCode.TURN_RIGHT, KD_APP_STRINGS.TURN_RIGHT],
  [StatementCode.TURN_LEFT, KD_APP_STRINGS.TURN_LEFT],
]);

export const NumberValueTitle = new Map<StatementCode, string>([
  [StatementCode.JUMP,'צעדים']
]);

export const DefaultNumberValue = new Map<StatementCode, number>([
  [StatementCode.JUMP,50]
]);

export const DefaultStringValue = new Map<StatementCode, string>([
  [StatementCode.SET_STROKE,"#00ff00"]
]);



