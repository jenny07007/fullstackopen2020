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
    <div>
      <Statistic text="good" value={good} />
      <Statistic text="neural" value={neural} />
      <Statistic text="bad" value={bad} />
      <Statistic text="total" value={total} />
      <Statistic text="average" value={calculateAvg} />
      <Statistic text="positive" value={calculatePositive + " %"} />
    </div>
  );
};

export default Statistics;
