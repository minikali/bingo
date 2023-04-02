import React from "react";
import styles from "@/styles/Card.module.css";

interface CardProps extends React.HTMLAttributes<HTMLElement> {}

const Card = ({ className, children, ...props }: CardProps) => {
  return (
    <div className={styles.card} {...props}>
      {children}
    </div>
  );
};

export default Card;
