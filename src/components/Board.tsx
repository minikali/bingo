import { useCallback, useEffect, useRef } from "react";
import styles from "@/styles/Board.module.css";
import Layout from "@/layouts/Layout";
import { useSettingsContext } from "@/contexts/settings-context";
import TableResults from "@/components/TableResults";
import Ball from "@/components/Ball";
import Button from "./Button";
import { PlayIcon } from "./icons/Play-icon";
import { PauseIcon } from "./icons/Pause-icon";
import { RestartIcon } from "./icons/Restart-icon";
import useTimer from "@/hooks/useTimer";
import useBingoState from "@/hooks/useBingoState";
import ProgressBar from "./ProgressBar";

const Board = () => {
  const { range, intervalTime, setIntervalTime } = useSettingsContext();
  const {
    drawnNumbers,
    currentNumber,
    remainingNumbers,
    drawNumber,
    restartDrawing,
  } = useBingoState(range.max);

  const { timer, isRunning, startTimer, pauseTimer, resetTimer } = useTimer({
    defaultTimer: intervalTime,
    callback: drawNumber,
  });

  const handleIntervalChange = (
    event: React.ChangeEvent<HTMLInputElement> | undefined
  ) => {
    const value = event?.target?.value;
    if (!value) return;
    setIntervalTime(parseInt(value, 10));
    resetTimer();
  };

  const handlePlayPauseButton = useCallback(() => {
    if (!isRunning) startTimer();
    else pauseTimer();
  }, [isRunning, startTimer, pauseTimer]);

  const handleRestartButton = useCallback(() => {
    resetTimer();
    restartDrawing();
  }, [resetTimer, restartDrawing]);

  return (
    <Layout>
      <main className={styles.bingo}>
        <div className={styles.ballContainer}>
          <Ball>{currentNumber}</Ball>
        </div>
        <div className={styles.command}>
          <Button
            color={!isRunning ? "blue" : "yellow"}
            onClick={handlePlayPauseButton}
          >
            {!isRunning ? <PlayIcon /> : <PauseIcon />}
          </Button>
          <Button
            color="red"
            onClick={handleRestartButton}
            disabled={isRunning}
          >
            <RestartIcon />
          </Button>
        </div>
        <ProgressBar className={styles.progressBar} timer={timer} intervalTime={intervalTime} />
        {remainingNumbers.length === 0 && <h2>All numbers have been drawn.</h2>}
        <TableResults range={range} drawnNumbers={drawnNumbers} />
        <h3>Settings</h3>
        <div>
          <label htmlFor="interval-slider">
            Drawing interval : {timer} {intervalTime > 1 ? "seconds" : "second"}
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

export default Board;
