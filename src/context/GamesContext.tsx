import React, { useState } from 'react';

export type GamesContextType = {
  audioOn: boolean;
  turnAudioOn: () => void;
  turnAudioOff: () => void;

  isTablet: boolean;
  setIsTablet: (val: boolean) => void;

  isPortrait: boolean;
  setIsPortrait: (val: boolean) => void;
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

  const [isTablet, setIsTabletState] = useState<boolean>(false);
  const setIsTablet = (val: boolean) => {
    setIsTabletState(val);
  }

  const [isPortrait, setIsPortraitState] = useState<boolean>(false);
  const setIsPortrait = (val: boolean) => {
    setIsPortraitState(val);
  }

  return (
    <GamesContext.Provider
      value={{
        audioOn,
        turnAudioOn,
        turnAudioOff,
        isTablet,
        setIsTablet,      
        isPortrait,
        setIsPortrait,      
      }}
    >
      {children}
    </GamesContext.Provider>
  );
};

export default GamesContext;
