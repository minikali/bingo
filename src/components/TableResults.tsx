import React from "react";
import styles from "@/styles/TableResults.module.css";
import Ball, { getBallColor } from "./Ball";

interface Props {
  range: {
    min: number;
    max: number;
  };
  drawnNumbers: number[];
}

const TableResults = ({ range: { min, max }, drawnNumbers }: Props) => {
  const createTable = () => {
    const rows = Math.ceil((max - min + 1) / 10);
    const columns = 10;

    const table = [];
    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 1; j <= columns; j++) {
        const number = i * 10 + j;

        row.push(
          <td key={number} className={styles.cell}>
            <Ball
              size="xs"
              color={
                drawnNumbers.includes(number) ? getBallColor(number) : "gray"
              }
            >
              {number}
            </Ball>
          </td>
        );
      }
      table.push(<tr key={i}>{row}</tr>);
    }
    return table;
  };

  return (
    <table className={styles.numberTable}>
      <tbody>{createTable()}</tbody>
    </table>
  );
};

export default TableResults;
