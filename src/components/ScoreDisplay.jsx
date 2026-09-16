export default function ScoreDisplay({ currentScore, bestScore }) {
  return (
    <div className="scoreDisplay">
      <div className="currrent">Current Score: {currentScore}</div>
      <div className="best">Best Score: {bestScore}</div>
    </div>
  );
}
