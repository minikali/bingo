import { useCallback, useEffect, useRef, useState } from "react";
import cn from "classnames";
import styles from "@/styles/Bingo.module.css";
import config from "../../config";
import createShuffledArray from "@/utils/create-shuffled-array";
import Layout from "@/layouts/Layout";

interface Props {
  min: number;
  max: number;
  defaultTimer: number;
}

const Bingo = ({ min, max, defaultTimer }: Props) => {
  const [drawnNumbers, setDrawnNumbers] = useState<number[]>([]);
  const [currentNumber, setCurrentNumber] = useState<number | null>(null);
  const [remainingNumbers, setRemainingNumbers] = useState(
    createShuffledArray(max)
  );
  const [isDrawing, setIsDrawing] = useState(false);
  const [timer, setTimer] = useState(0);
  const [intervalTime, setIntervalTime] = useState(defaultTimer);
  const intervalRef = useRef<NodeJS.Timer | null>(null);

  const drawNumber = useCallback(() => {
    if (remainingNumbers.length > 0) {
      const randomNumber = remainingNumbers.pop()!;
      setCurrentNumber(randomNumber);
      setDrawnNumbers([...drawnNumbers, randomNumber]);
      setRemainingNumbers(remainingNumbers);
      setTimer(0);
    } else {
      setCurrentNumber(null);
      setIsDrawing(false);
    }
  }, [drawnNumbers, remainingNumbers]);

  const startDrawing = () => {
    setIsDrawing(true);
  };

  const pauseDrawing = () => {
    setIsDrawing(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const restartDrawing = () => {
    setCurrentNumber(null);
    setDrawnNumbers([]);
    setRemainingNumbers(createShuffledArray(max));
    setTimer(0);
    setIsDrawing(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const createTable = () => {
    const rows = Math.ceil((max - min + 1) / 10);
    const columns = 10;

    const table = [];
    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 1; j <= columns; j++) {
        const number = i * 10 + j;
        row.push(
          <td
            key={number}
            className={cn(styles.numberCell, {
              [styles.drawn]: drawnNumbers.includes(number),
            })}
          >
            {number}
          </td>
        );
      }
      table.push(<tr key={i}>{row}</tr>);
    }
    return table;
  };

  useEffect(() => {
    if (!isDrawing) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(() => {
      drawNumber();
    }, intervalTime * 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [drawnNumbers, isDrawing, intervalTime, drawNumber]);

  const handleIntervalChange = (
    event: React.ChangeEvent<HTMLInputElement> | undefined
  ) => {
    if (!event) return;
    setIntervalTime(parseInt(event.target.value, 10));
  };

  useEffect(() => {
    if (!isDrawing) return;

    const timerInterval = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [isDrawing]);

  return (
    <Layout>
      <main className={styles.bingo}>
        <h1>Bingo Draw</h1>
        <button onClick={startDrawing} disabled={isDrawing}>
          Start
        </button>
        <button onClick={pauseDrawing} disabled={!isDrawing}>
          Pause
        </button>
        <button onClick={restartDrawing}>Reset</button>
        <p>
          Time remaining until the next draw : {intervalTime - timer} seconds
        </p>
        <div>
          <label htmlFor="interval-slider">
            Drawing interval : {intervalTime}{" "}
            {intervalTime > 1 ? "seconds" : "second"}
          </label>
          <input
            type="range"
            id="interval-slider"
            min="1"
            max="10"
            value={intervalTime}
            onChange={handleIntervalChange}
          />
        </div>
        {currentNumber !== null && <h2>Number drawn : {currentNumber}</h2>}
        {remainingNumbers.length === 0 && <h2>All numbers have been drawn.</h2>}
        <h3>Number Table :</h3>
        <table className={styles.numberTable}>
          <tbody>{createTable()}</tbody>
        </table>
      </main>
    </Layout>
  );
};

export async function getStaticProps() {
  return {
    props: {
      min: config.range.min,
      max: config.range.max,
      defaultTimer: config.defaultTimer,
    },
  };
}

export default Bingo;
