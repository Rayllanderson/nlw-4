import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import challenges from '../../challenges.json'
import { CountdownContext } from './CountdownContext';

interface Challenge {
  type: 'body' | 'eye',
  description: string,
  amount: number;
}

interface ChallengesContextData {
  level: number,
  currentExperience: number,
  challengesCompleted: number,
  activeChallenge: Challenge,
  experienceToNextLevel: number,
  startNewChallenge: () => void,
  levelUp: () => void,
  resetChallenge: () => void,
  completeChallenge: () => void;
}

interface ChallengeProviderProps {
  children: ReactNode
}

export const ChallengeContext = createContext({} as ChallengesContextData);

export function ChallengeProvider({ children }: ChallengeProviderProps) {
  const [level, setLevel] = useState(1);
  const [currentExperience, setCurrentExperience] = useState(0);
  const [challengesCompleted, setChallengesCompleted] = useState(0);
  const [activeChallenge, setActiveChallenge] = useState(null);
  const { resetCountdown } = useContext(CountdownContext);

  function levelUp() {
    setLevel(level + 1);
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];


    setActiveChallenge(challenge);
  }

  function resetChallenge() {
    setActiveChallenge(null)
  }

  function completeChallenge() {
    if (!activeChallenge) {
      return;
    }

    const { amount } = activeChallenge;
    let finalExperience = currentExperience + amount;
    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();
    }
    setCurrentExperience(finalExperience);
    setActiveChallenge(null);
    setChallengesCompleted(challengesCompleted + 1);
  }

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  return (
    <ChallengeContext.Provider
      value={{
        level,
        currentExperience,
        challengesCompleted,
        activeChallenge,
        experienceToNextLevel,
        levelUp,
        startNewChallenge,
        resetChallenge,
        completeChallenge
      }}>
      {children}
    </ChallengeContext.Provider>
  )
}