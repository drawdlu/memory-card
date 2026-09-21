import "../style/ScoreDisplay.css";

export default function ScoreDisplay({ currentScore, bestScore }) {
  return (
    <div className="scoreDisplay">
      <div className="currrent score">Current Score: {currentScore}</div>
      <div className="best score">Best Score: {bestScore}</div>
    </div>
  );
}
