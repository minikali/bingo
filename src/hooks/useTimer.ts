import { useState, useCallback, useRef, useEffect } from "react";

/**
 * Props for the useTimer hook.
 */
interface TimerProps<T = void> {
  /** Time interval in milliseconds */
  defaultTimer: number;
  /** Callback function to run on each tick */
  callback: () => T;
}

/**
 * Return values for the useTimer hook.
 */
interface TimerReturnProps {
  /** The current timer value in milliseconds */
  timer: number;
  /* Indicates whether the timer is currently running or paused */
  isRunning: boolean;
  /** Start the timer */
  startTimer: () => void;
  /** Pause the timer */
  pauseTimer: () => void;
  /** Reset the timer to its default value */
  resetTimer: () => void;
}

/**
 * A hook for creating a timer that can be started, paused, and reset.
 * @param props - The props for the timer.
 * @returns An object containing the current timer value and functions for starting, pausing, and resetting the timer.
 */
const useTimer = ({ defaultTimer, callback }: TimerProps): TimerReturnProps => {
  const [timer, setTimer] = useState(defaultTimer);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * A function to start the timer.
   */
  const startTimer = useCallback(() => {
    setIsRunning(true);
  }, []);

  /**
   * A function to pause the timer.
   */
  const pauseTimer = useCallback(() => {
    setIsRunning(false);
    setTimer(defaultTimer);
  }, [defaultTimer]);

  /**
   * A function to reset the timer to its default value.
   */
  const resetTimer = useCallback(() => {
    setTimer(defaultTimer);
    setIsRunning(false);
  }, [defaultTimer]);

  /**
   * A function to handle the timer tick.
   */
  const handleTick = useCallback(() => {
    setTimer((timer) => {
      const newTimer = timer - 100;
      if (newTimer <= 0) {
        // setIsRunning(false);
        callback();
        return defaultTimer;
      } else {
        return newTimer;
      }
    });
  }, [defaultTimer, callback]);

  /**
   * Set up the interval to handle the timer tick.
   */
  useEffect(() => {
    if (isRunning && intervalRef.current === null) {
      intervalRef.current = setInterval(handleTick, 100);
    } else if (!isRunning && intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isRunning, handleTick]);

  return {
    timer,
    isRunning,
    startTimer,
    pauseTimer,
    resetTimer,
  };
};

export default useTimer;
