import "./Instructions.css";
import instructionsObj from "./instructionsObj";

const Instructions = ({ startGame }) => {
  return (
    <div className="instructions" data-testid="instructions">
      <h2>{instructionsObj.gameTitle}</h2>
      <p>{instructionsObj.directionInstruction}</p>
      <p style={{ color: "red" }}>{instructionsObj.warningInstruction}</p>
      <p>{instructionsObj.tipInstruction}</p>
      <p>{instructionsObj.startGameInstruction}</p>
      <button onClick={startGame}>Start Game</button>
    </div>
  );
};

export default Instructions;
