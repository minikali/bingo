import { useCallback, useState } from "react";
import createShuffledArray from "@/utils/create-shuffled-array";

interface IBingoState {
  drawnNumbers: number[];
  remainingNumbers: number[];
  currentNumber: number | null;
  drawNumber: () => void;
  restartDrawing: () => void;
}

const useBingoState = (max: number): IBingoState => {
  const [drawnNumbers, setDrawnNumbers] = useState<number[]>([]);
  const [currentNumber, setCurrentNumber] = useState<number | null>(null);
  const [remainingNumbers, setRemainingNumbers] = useState<number[]>(
    createShuffledArray(max)
  );

  const drawNumber = useCallback(() => {
    if (remainingNumbers.length > 0) {
      const randomNumber = remainingNumbers.pop()!;
      setCurrentNumber(randomNumber);
      setDrawnNumbers([...drawnNumbers, randomNumber]);
      setRemainingNumbers(remainingNumbers);
    } else {
      setCurrentNumber(null);
    }
  }, [drawnNumbers, remainingNumbers]);

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
