import { useCallback, useEffect, useState } from "react";
import styles from "@/styles/Board.module.css";
import Layout from "@/layouts/Layout";
import { useSettingsContext } from "@/contexts/settings-context";
import TableResults from "@/components/TableResults";
import Ball, { getBallColor } from "@/components/Ball";
import Button from "./Button";
import { PlayIcon } from "./icons/Play-icon";
import { PauseIcon } from "./icons/Pause-icon";
import { RestartIcon } from "./icons/Restart-icon";
import useTimer from "@/hooks/useTimer";
import useBingoState from "@/hooks/useBingoState";
import ProgressBar from "./ProgressBar";
import Popup from "./Popup";
import { GearIcon } from "./icons/Gear-icon";
import Slider from "./Slider";

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
  const [showPopup, setShowPopup] = useState(false);
  const [showSettingsPopup, setShowSettingsPopup] = useState(false);

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

  const handleClosePopup = useCallback(() => {
    setShowPopup(false);
  }, []);

  const toggleSettingsPopup = useCallback(() => {
    setShowSettingsPopup((prev) => !prev);
  }, []);

  useEffect(() => {
    if (remainingNumbers.length === 0) {
      setShowPopup(true);
      pauseTimer();
    }
  }, [pauseTimer, remainingNumbers]);

  useEffect(() => {
    resetTimer();
  }, [intervalTime, resetTimer]);

  return (
    <Layout>
      <Popup show={showPopup} onClose={handleClosePopup}>
        <h2>All numbers have been drawn.</h2>
      </Popup>
      <Popup show={showSettingsPopup} onClose={toggleSettingsPopup}>
        <h3>Settings</h3>
        <div className={styles.slider}>
          <Slider value={intervalTime} onChange={setIntervalTime} />
        </div>
      </Popup>
      <main className={styles.bingo}>
        <div className={styles.ballContainer}>
          <Ball
            color={
              currentNumber && drawnNumbers.includes(currentNumber)
                ? getBallColor(currentNumber)
                : "dark"
            }
          >
            {currentNumber}
          </Ball>
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
          <Button
            color="yellow"
            onClick={toggleSettingsPopup}
            disabled={isRunning}
          >
            <GearIcon />
          </Button>
        </div>
        <ProgressBar
          className={styles.progressBar}
          timer={timer}
          intervalTime={intervalTime}
        />
        <TableResults range={range} drawnNumbers={drawnNumbers} />
      </main>
    </Layout>
  );
};

export default Board;
