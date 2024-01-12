import "./Board.css";
import { useSelector } from "react-redux";

const Board = ({ children }) => {
  const boardSize = useSelector((state) => state.boardSize);

  return (
    <div
      className="board"
      data-testid="board"
      style={{ height: `${boardSize}px`, width: `${boardSize}px` }}
    >
      {children}
    </div>
  );
};

export default Board;
