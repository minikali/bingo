import { useCallback, useState } from "react";
import createShuffledArray from "@/utils/create-shuffled-array";

/**
 * Interface representing the bingo state.
 */
interface IBingoState {
  /** An array of the drawn numbers. */
  drawnNumbers: number[];
  /** The current number being drawn. */
  currentNumber: number | null;
  /** An array of the remaining numbers. */
  remainingNumbers: number[];
  /** A function to draw the next number. */
  drawNumber: () => void;
  /** A function to restart the drawing process. */
  restartDrawing: () => void;
}

/**
 * A custom hook for managing the Bingo state.
 * @param {number} max - The maximum value for the Bingo game.
 * @returns {IBingoState} An object containing the Bingo state and functions for managing it.
 */
const useBingoState = (max: number): IBingoState => {
  const [drawnNumbers, setDrawnNumbers] = useState<number[]>([]);
  const [currentNumber, setCurrentNumber] = useState<number | null>(null);
  const [remainingNumbers, setRemainingNumbers] = useState<number[]>(
    createShuffledArray(max)
  );

  /**
   * Draw the next number from the remaining numbers.
   */
  const drawNumber = useCallback(() => {
    const newRemainingNumbers = [...remainingNumbers];
    if (newRemainingNumbers.length > 0) {
      const randomNumber = newRemainingNumbers.pop()!;
      setCurrentNumber(randomNumber);
      setDrawnNumbers((prevDrawnNumbers) => [
        ...prevDrawnNumbers,
        randomNumber,
      ]);
      setRemainingNumbers(newRemainingNumbers);
    } else {
      setCurrentNumber(null);
    }
  }, [remainingNumbers]);

  /**
   * Restart the drawing by resetting the state.
   */
  const restartDrawing = useCallback(() => {
    setCurrentNumber(null);
    setDrawnNumbers([]);
    setRemainingNumbers(createShuffledArray(max));
  }, [max]);

  return {
    drawnNumbers,
    currentNumber,
    remainingNumbers,
    drawNumber,
    restartDrawing,
  };
};

export default useBingoState;
