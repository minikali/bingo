import { useEffect, useRef } from "react";
import styles from "@/styles/Bingo.module.css";
import config from "../../config";
import Layout from "@/layouts/Layout";
import { useSettingsContext } from "@/contexts/settings-context";
import TableResults from "@/components/TableResults";
import { useGameContext } from "@/contexts/game-context";

const Bingo = () => {
  const { range, intervalTime, setIntervalTime } = useSettingsContext();
  const {
    timer,
    isDrawing,
    currentNumber,
    remainingNumbers,
    drawnNumbers,
    drawNumber,
    startDrawing,
    pauseDrawing,
    restartDrawing,
    incrementTimer,
  } = useGameContext();

  const intervalRef = useRef<NodeJS.Timer | null>(null);

  const handleIntervalChange = (
    event: React.ChangeEvent<HTMLInputElement> | undefined
  ) => {
    const value = event?.target?.value;
    if (!value) return;
    setIntervalTime(parseInt(value, 10));
  };

  useEffect(() => {
    if (!isDrawing) {
      if (intervalRef.current) clearTimeout(intervalRef.current);
      return;
    }
    intervalRef.current = setTimeout(() => {
      drawNumber();
      intervalRef.current = setTimeout(() => {
        setImmediate(() => {});
      }, intervalTime * 1000);
    }, intervalTime * 1000);

    return () => {
      if (intervalRef.current) clearTimeout(intervalRef.current);
    };
  }, [drawnNumbers, isDrawing, intervalTime, drawNumber]);

  useEffect(() => {
    if (!isDrawing) return;

    const timerInterval = setInterval(() => incrementTimer(), 1000);

    return () => clearInterval(timerInterval);
  }, [incrementTimer, isDrawing]);

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
        {currentNumber !== null && <h2>Number drawn : {currentNumber}</h2>}
        {remainingNumbers.length === 0 && <h2>All numbers have been drawn.</h2>}
        <TableResults range={range} drawnNumbers={drawnNumbers} />
        <h3>Settings</h3>
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
      </main>
    </Layout>
  );
};

export async function getStaticProps() {
  return {
    props: {
      min: config.range.min,
      max: config.range.max,
    },
  };
}

export default Bingo;
