
import React, { createContext, useContext, useState } from 'react';

interface NavigationContextType {
  currentVolume: number;
  setCurrentVolume: (volume: number) => void;
  loopEnabled: boolean;
  setLoopEnabled: (enabled: boolean) => void;
  soundSettings: {
    matchStart: string;
    ballInPlay: string;
    pointScored: string;
    foul: string;
  };
  setSoundSettings: (settings: any) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentVolume, setCurrentVolume] = useState(70);
  const [loopEnabled, setLoopEnabled] = useState(false);
  const [soundSettings, setSoundSettings] = useState({
    matchStart: 'Whistle',
    ballInPlay: 'Boom',
    pointScored: 'Cheer',
    foul: 'Horn'
  });

  return (
    <NavigationContext.Provider
      value={{
        currentVolume,
        setCurrentVolume,
        loopEnabled,
        setLoopEnabled,
        soundSettings,
        setSoundSettings,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};
