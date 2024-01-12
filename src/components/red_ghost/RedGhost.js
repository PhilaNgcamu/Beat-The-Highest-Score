import "./RedGhost.css";
import { useSelector } from "react-redux";

const RedGhost = () => {
  const redGhostPosition = useSelector((state) => state.redGhostPosition);
  const offset = 5;

  return (
    <div
      className="redGhost"
      data-testid="redGhost"
      style={{
        top: redGhostPosition.top - offset,
        left: redGhostPosition.left - offset,
      }}
    ></div>
  );
};

export default RedGhost;
