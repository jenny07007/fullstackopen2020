import React from "react";

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
      <p>{`good ${good}`}</p>
      <p>{`neural ${neural}`}</p>
      <p>{`bad ${bad}`}</p>
      <p>{`all ${total}`}</p>
      <p>{`average: ${calculateAvg(good, bad) || 0}`}</p>
      <p>{`positive: ${calculatePositive(good) || 0} %`}</p>
    </div>
  );
};

export default Statistics;
