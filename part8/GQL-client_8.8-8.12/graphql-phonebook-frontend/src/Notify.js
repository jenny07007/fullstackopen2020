import React from "react";

const Notify = ({ errorMessage }) => {
  return (
    <div>
      <div style={{ color: "red" }}>{errorMessage}</div>
    </div>
  );
};

export default Notify;
