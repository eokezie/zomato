import React from 'react';
import Animated, { useSharedValue, withTiming } from 'react-native-reanimated';

interface SharedStateContextType {
  scrollY: Animated.SharedValue<number>;
  scrollYGlobal: Animated.SharedValue<number>;
  scrollToTop: () => void;
}

const SharedStateContext = React.createContext<SharedStateContextType | undefined>(undefined);

export const SharedStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const scrollY = useSharedValue(0);
  const scrollYGlobal = useSharedValue(0);
  const scrollToTop = () => {
    (scrollY.value = withTiming(0, { duration: 300 })),
      (scrollYGlobal.value = withTiming(0, { duration: 300 }));
  };

  return (
    <SharedStateContext.Provider value={{ scrollToTop, scrollY, scrollYGlobal }}>
      {children}
    </SharedStateContext.Provider>
  );
};

export const useShareState = () => {
  const context = React.useContext(SharedStateContext);
  if (context === undefined) {
    throw new Error('useSharedState must be used within a SharedStateProvider');
  }

  return context;
};
