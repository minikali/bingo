import React from "react";
import cx from "classnames";
import s from "@/styles/Button.module.css";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: "blue" | "yellow" | "red";
}

const Button = ({ children, className, color = "blue", ...props }: Props) => {
  return (
    <button {...props} className={cx(className, s.button, s[color])}>
      {children}
    </button>
  );
};

export default Button;
