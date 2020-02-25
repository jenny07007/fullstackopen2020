import React from "react";

const Total = ({ parts }) => {
  const renderTotal = () => {
    let total = 0;
    for (let part of parts) {
      total += part.exercises;
    }
    return total;
  };

  return <p>{renderTotal()}</p>;
};

export default Total;
