import React from "react";

const Button = ({ setGood, setNeutral, setBad }) => {
  return (
    <div>
      <button onClick={setGood}>good</button>
      <button onClick={setNeutral}>neural</button>
      <button onClick={setBad}>bad</button>
    </div>
  );
};

export default Button;
