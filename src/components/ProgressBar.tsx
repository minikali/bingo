import React from "react";
import cx from "classnames";
import styles from "@/styles/ProgressBar.module.css";

interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  timer: number;
  intervalTime: number;
}

const ProgressBar = ({
  timer,
  intervalTime,
  className,
  ...props
}: ProgressBarProps) => {
  const progressBarWidth = `${(timer / intervalTime) * 100}%`;

  return (
    <div {...props} className={cx(className, styles.progressBarContainer)}>
      <div className={styles.progressBar} style={{ width: progressBarWidth }} />
    </div>
  );
};

export default ProgressBar;
