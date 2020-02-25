import React, { useState } from "react";
import "./styles.css";

const App = () => {
  const [good, setGood] = useState(0);
  const [neural, setNerural] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div className="App">
      <h1>give feedback</h1>
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNerural(neural + 1)}>neural</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>
      <h1>satistics</h1>
      <p>{`good ${good}`}</p>
      <p>{`neural ${neural}`}</p>
      <p>{`good ${bad}`}</p>
    </div>
  );
};

export default App;
