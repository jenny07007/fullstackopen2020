import React from "react";

const Notify = ({ errorMessage }) => {
  return (
    <div>
      <div style={{ color: "tomato" }}>{errorMessage}</div>
    </div>
  );
};

export default Notify;
