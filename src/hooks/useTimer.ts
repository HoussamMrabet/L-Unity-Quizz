import { useState, useEffect } from 'react';
import { TimerState } from '../types';

export const useTimer = (initialTime: number = 30) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const startTimer = () => setIsRunning(true);
  const pauseTimer = () => setIsRunning(false);
  const toggleTimer = () => setIsRunning(!isRunning);
  
  const setTimer = (seconds: number) => {
    setTimeLeft(seconds);
    setIsRunning(false);
  };

  const adjustTimer = (seconds: number) => {
    setTimeLeft((prev) => Math.max(0, prev + seconds));
  };

  const resetTimer = () => {
    setTimeLeft(initialTime);
    setIsRunning(false);
  };

  return {
    timeLeft,
    isRunning,
    startTimer,
    pauseTimer,
    toggleTimer,
    setTimer,
    adjustTimer,
    resetTimer,
  };
};