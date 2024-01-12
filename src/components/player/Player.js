import "./Player.css";
import { useSelector } from "react-redux";

const Player = () => {
  const playerPosition = useSelector((state) => state.playerPosition);
  const offset = 5;

  return (
    <div
      className="player"
      data-testid="player"
      style={{
        top: playerPosition.top - offset,
        left: playerPosition.left - offset,
      }}
    ></div>
  );
};

export default Player;
