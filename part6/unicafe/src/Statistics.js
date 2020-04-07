import React from "react";
import Statistic from "./Statistic";

const Statistics = ({
  good,
  neural,
  bad,
  total,
  calculateAvg,
  calculatePositive
}) => {
  return (
    <table
      style={{
        textAlign: "left",
        margin: "0 auto",
        borderCollapse: "separate",
        borderSpacing: "1em 0"
      }}
    >
      <Statistic text="good" value={good} />
      <Statistic text="neural" value={neural} />
      <Statistic text="bad" value={bad} />
      <Statistic text="total" value={total} />
      <Statistic text="average" value={calculateAvg} />
      <Statistic text="positive" value={calculatePositive + " %"} />
    </table>
  );
};

export default Statistics;
