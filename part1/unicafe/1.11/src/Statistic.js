import React from "react";

const Statistic = ({ text, value }) => {
  return (
    <>
      <tr style={{ height: "1.5em" }}>
        <td>{text}</td>
        <td style={{ marginLeft: "5px" }}>{value}</td>
      </tr>
    </>
  );
};

export default Statistic;
