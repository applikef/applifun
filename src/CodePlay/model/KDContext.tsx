import React, { useState } from 'react';
import { KDCode, KDCodeStatement } from './kidDevModel';
import { updateCodeStatement } from '../utils/codeUtil';

export type KDContextType = {
  displayLevel: number;
  code: KDCode;

  setDisplayLevel: (newValue: number) => void;
  setCode: (newCode: KDCode) => void;
  setCodeStatement: (newStatement: KDCodeStatement) => void;
};

const KDContext = React.createContext<KDContextType | null>(null);

export const KidDevProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {

  const [displayLevel, setDisplayLevelState] = useState<number>(0);
  const setDisplayLevel = (newValue: number) => {
    setDisplayLevelState(() => newValue);
  }

  const [code, setCodeState] = useState<KDCode>({code: []});
  const setCode = (newCode: KDCode) => {
    setCodeState(newCode);
  }
  const setCodeStatement = (newStatement: KDCodeStatement) => {
    const newCode: KDCode = updateCodeStatement(code, newStatement);
    setCodeState(newCode);
  }

  return (
    <KDContext.Provider
      value={{
        displayLevel,
        //pencil,
        code,
        //stroke,
        setDisplayLevel,
        //setPencil,
        setCode,
        setCodeStatement,
        //setStroke
      }}
    >
      {children}
    </KDContext.Provider>
  );
};

export default KDContext;
