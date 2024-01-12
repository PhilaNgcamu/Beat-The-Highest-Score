import "./Sandwich.css";
import { useSelector } from "react-redux";

const Sandwich = () => {
  const sandwichPosition = useSelector((state) => state.sandwichPosition);
  const offset = 5;

  return (
    <div
      className="sandwich"
      data-testid="sandwich"
      style={{
        top: sandwichPosition.top - offset,
        left: sandwichPosition.left - offset,
      }}
    ></div>
  );
};

export default Sandwich;
