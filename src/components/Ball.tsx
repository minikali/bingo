import React from "react";
import cx from "classnames";
import s from "@/styles/Ball.module.css";

interface Props {
  className?: string;
  children: React.ReactNode;
  size?: "xs" | "lg";
  color?: "dark" | "green" | "blue" | "yellow" | "red" | "purple" | "gray";
}

export const getBallColor = (number: number) => {
  switch (number % 2) {
    case 0:
      return "green";
    case 1:
      return "red";
    case 2:
      return "yellow";
    case 3:
      return "blue";
    case 4:
      return "purple";
    default:
      return "gray";
  }
};

const Ball = ({ className, children, size = "lg", color = "dark" }: Props) => {
  return (
    <div className={cx(s.ball, s[size], s[color], className)}>
      <div className={s.white}>
        <div className={s.number}>{children}</div>
      </div>
    </div>
  );
};

export default Ball;
