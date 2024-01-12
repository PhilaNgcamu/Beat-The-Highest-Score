import "./SandwichPoints.css";
import { useSelector } from "react-redux";

const SandwichPoints = () => {
  const sandwichPoints = useSelector((state) => state.sandwichPoints);

  return (
    <div className="sandwichPoints" data-testid="sandwichPoints">
      {sandwichPoints} sandwiches eaten
    </div>
  );
};

export default SandwichPoints;
