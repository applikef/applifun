import React, { useState } from 'react';

export type GamesContextType = {
  audioOn: boolean;
  turnAudioOn: () => void;
  turnAudioOff: () => void;
};

const GamesContext = React.createContext<GamesContextType | null>(null);

export const GamesProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {

  const [audioOn, setAudioOn] = useState<boolean>(true);

  const turnAudioOn = () => {
    setAudioOn(() => true);
  }

  const turnAudioOff = () => {
    setAudioOn(() => false);
  }

  return (
    <GamesContext.Provider
      value={{
        audioOn,
        turnAudioOn,
        turnAudioOff,
      }}
    >
      {children}
    </GamesContext.Provider>
  );
};

export default GamesContext;
