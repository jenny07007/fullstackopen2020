import React, { useState } from "react";
import "./styles.css";

const App = () => {
  const [good, setGood] = useState(0);
  const [neural, setNerural] = useState(0);
  const [bad, setBad] = useState(0);

  const total = good + neural + bad;
  const calculateAvg = (good, bad) => (good - bad) / total;
  const calculatePositive = good => (good / total) * 100;
  return (
    <div className="App">
      <h1>give feedback</h1>
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNerural(neural + 1)}>neural</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>
      <h1>satistics</h1>
      <p>{`good ${good}`}</p>
      <p>{`neural ${neural}`}</p>
      <p>{`bad ${bad}`}</p>
      <p>{`all ${total}`}</p>
      <p>{`average: ${calculateAvg(good, bad) || 0}`}</p>
      <p>{`positive: ${calculatePositive(good) || 0} %`}</p>
    </div>
  );
};

export default App;
