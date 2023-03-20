import React from "react";
import cx from "classnames";
import styles from "@/styles/TableResults.module.css";

interface Props {
  range: {
    min: number;
    max: number;
  };
  drawnNumbers: number[];
}

const TableResults = ({ range: { min, max }, drawnNumbers }: Props) => {
  const getClassName = (number: number): string =>
    cx(styles.numberCell, {
      [styles.drawn]: drawnNumbers.includes(number),
    });

  const createTable = () => {
    const rows = Math.ceil((max - min + 1) / 10);
    const columns = 10;

    const table = [];
    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 1; j <= columns; j++) {
        const number = i * 10 + j;
        row.push(
          <td key={number} className={getClassName(number)}>
            {number}
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
