import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengeContext } from "./ChallengesContext";

interface CountdownContextData{
  minutes: number,
  seconds: number,
  hasFinished: boolean,
  isActive: boolean,
  startCountdown: () => void,
  resetCountdown: () => void;
}

interface CountdownProviderProps {
  children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextData);

let countdownTimeout: NodeJS.Timeout;

export function CountdownProvider({children}: CountdownProviderProps){
  
  const { startNewChallenge } = useContext(ChallengeContext);

  const defaultTime = 0.1 * 60;

  const [time, setTime] = useState(defaultTime);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  function startCountdown() {
    setIsActive(true)
  }
  function resetCountdown() {
    setIsActive(false);
    clearTimeout(countdownTimeout);
    setTime(defaultTime);
    setHasFinished(false)
  }

  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1)
      }, 1000)
    } else if (isActive && time === 0) {
      setHasFinished(true)
      setIsActive(false)
      startNewChallenge();
    }
  }, [isActive, time])

  
  return (
    <CountdownContext.Provider value={{
      minutes,
      seconds,
      hasFinished,
      isActive,
      startCountdown,
      resetCountdown
    }}>
      {children}
    </CountdownContext.Provider>
  )
}