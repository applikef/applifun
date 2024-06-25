import React, { useState } from 'react';
import { KidDevCode, KidDevCodeStatement } from './kidDevModel';
import { updateCodeStatement } from './utils/statementsUtil';

export type KidDevContextType = {
  displayLevel: number;
  code: KidDevCode;
  penX: number;
  penY: number;
  pencilX: number;
  pencilY: number;
  stroke: string;

  setDisplayLevel: (newValue: number) => void;
  setCode: (newCode: KidDevCode) => void;
  setCodeStatement: (newStatement: KidDevCodeStatement) => void;
  setPenX: (x: number) => void;
  setPenY: (y: number) => void;
  setPencilX: (x: number) => void;
  setPencilY: (y: number) => void;
};

const KidDevContext = React.createContext<KidDevContextType | null>(null);

export const KidDevProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {

  const [displayLevel, setDisplayLevelState] = useState<number>(0);
  const setDisplayLevel = (newValue: number) => {
    setDisplayLevelState(() => newValue);
  }

  const [code, setCodeState] = useState<KidDevCode>({code: []});
  const setCode = (newCode: KidDevCode) => {
    setCodeState(newCode);
  }
  const setCodeStatement = (newStatement: KidDevCodeStatement) => {
    const newCode: KidDevCode = updateCodeStatement(code, newStatement);
    setCodeState(newCode);
  }

  const [pencilX, setPencilXState] = useState<number>(100);
  const [pencilY, setPencilYState] = useState<number>(100);
  const [penX, setPenXState] = useState<number>(pencilX + 62);
  const [penY, setPenYState] = useState<number>(pencilY + 116);
  const setPencilX = (x: number) => {
    setPencilXState(x);
  }
  const setPencilY = (y: number) => {
    setPencilYState(y);
  }
  const setPenX = (x: number) => {
    setPenXState(x);
  }
  const setPenY = (y: number) => {
    setPenYState(y);
  }
  
  const stroke = "blue";

  return (
    <KidDevContext.Provider
      value={{
        displayLevel,
        code,
        penX,
        penY,
        pencilX,
        pencilY,
        stroke,
        setDisplayLevel,
        setCode,
        setCodeStatement,
        setPenX,
        setPenY,
        setPencilX,
        setPencilY
      }}
    >
      {children}
    </KidDevContext.Provider>
  );
};

export default KidDevContext;
