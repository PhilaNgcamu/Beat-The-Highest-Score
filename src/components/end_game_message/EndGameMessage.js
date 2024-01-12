import "./EndGameMessage.css";
import { useSelector } from "react-redux";
import endGameMessageObj from "./endGameMessageObj";

const EndGameMessage = ({ onStartNewGame }) => {
  const gameOverMessage = useSelector((state) => state.gameOverMessage);
  const sandwichPoints = useSelector((state) => state.sandwichPoints);
  const highScore = useSelector((state) => state.highScore);

  return (
    <div className="end-game-message" data-testid="end-game-message">
      {gameOverMessage}
      <div>
        <div>{endGameMessageObj.yourScore + sandwichPoints}</div>
        <div>{endGameMessageObj.highScore + highScore}</div>
      </div>
      <button onClick={onStartNewGame}>Start New Game</button>
    </div>
  );
};

export default EndGameMessage;
