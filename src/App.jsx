import { useState } from "react";
import ScoreDisplay from "./components/ScoreDisplay";
import Images from "./components/Images";
import "./style/App.css";

function App() {
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  function handleGoodClick() {
    setCurrentScore((prev) => prev + 1);
  }

  function handleBadClick() {
    setBestScore((prev) => (prev > currentScore ? prev : currentScore));
    setCurrentScore(0);
  }

  return (
    <div class="main">
      <div className="title">
        <h1>Pokemon Memory Game</h1>
        <p>Train your memory! Click each pokemon once</p>
      </div>
      <ScoreDisplay bestScore={bestScore} currentScore={currentScore} />
      <Images goodClick={handleGoodClick} badClick={handleBadClick} />
    </div>
  );
}

export default App;
