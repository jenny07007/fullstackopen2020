import React, { useState } from "react";
import Statistics from "./Statistics";
import Button from "./Button";
import "./styles.css";

const App = () => {
  const [good, setGood] = useState(0);
  const [neural, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const total = good + neural + bad;
  const calculateAvg = (good, bad) => (good - bad) / total;
  const calculatePositive = good => (good / total) * 100;
  return (
    <div className="App">
      <h1>give feedback</h1>
      <Button
        setGood={() => setGood(good + 1)}
        setNeutral={() => setNeutral(neural + 1)}
        setBad={() => setBad(bad + 1)}
      />
      <h1>satistics</h1>
      {total !== 0 ? (
        <Statistics
          good={good}
          neural={neural}
          bad={bad}
          total={total}
          calculateAvg={calculateAvg(good, bad)}
          calculatePositive={calculatePositive(good)}
        />
      ) : (
        "No feedback given"
      )}
    </div>
  );
};

export default App;
