import { StatementCode } from "./utils/CodeInterpreter";

export interface KidDevCode {
  code: Array<KidDevCodeBlock>;
}

export interface KidDevCodeBlock {
  statements: Array<KidDevCodeStatement>;
}

export interface KidDevCodeStatement {
  id: string;
  name: StatementCode;
  coords?: Array<number>;
  magnitude?: number;
}