import React from "react";
import cx from "classnames";
import s from "@/styles/Ball.module.css";

interface Props {
  className?: string;
  children: React.ReactNode;
}

const Ball = ({ className, children }: Props) => {
  return (
    <div className={cx(s.ball, className)}>
      <div className={s.white}>
        <div className={s.number}>{children}</div>
      </div>
    </div>
  );
};

export default Ball;
