import { useCallback, useEffect, useRef, useState } from "react";
import cn from "classnames";
import Head from "next/head";
import styles from "@/styles/Bingo.module.css";
import config from "../../config";
import createShuffledArray from "@/utils/create-shuffled-array";

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
    <>
      <Head>
        <title>Bingo Draw App</title>
        <meta
          name="description"
          content="Une application de tirage au bingo en temps réel pour animer vos soirées entre amis ou en famille. Générez des numéros de bingo aléatoires et gardez une trace de tous les numéros tirés."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className={styles.bingo}>
          <h1>Tirage au bingo</h1>
          <button onClick={startDrawing} disabled={isDrawing}>
            Start
          </button>
          <button onClick={pauseDrawing} disabled={!isDrawing}>
            Pause
          </button>
          <button onClick={restartDrawing}>Reset</button>
          <p>Temps restant avant le prochain tirage : {intervalTime - timer} secondes</p>
          <div>
            <label htmlFor="interval-slider">
              Intervalle de tirage : {intervalTime}{" "}
              {intervalTime > 1 ? "secondes" : "seconde"}
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
          {currentNumber !== null ? (
            <h2>Numéro tiré : {currentNumber}</h2>
          ) : (
            <h2>Tous les numéros ont été tirés.</h2>
          )}
          <h3>Tableau des numéros :</h3>
          <table className={styles.numberTable}>
            <tbody>{createTable()}</tbody>
          </table>
        </div>
      </main>
    </>
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
