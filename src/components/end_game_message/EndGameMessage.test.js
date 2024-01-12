import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../state/store";
import EndGameMessage from "./EndGameMessage";
import endGameMessageObj from "./endGameMessageObj";

describe("EndGameMessage component", () => {
  test("should display the end game message", () => {
    render(
      <Provider store={store}>
        <EndGameMessage onStartNewGame={() => {}} />
      </Provider>
    );

    const endGameMessage = screen.getByTestId("end-game-message");
    const yourScore = screen.getByText(endGameMessageObj.yourScore + 0);
    const highScore = screen.getByText(endGameMessageObj.highScore + 0);

    expect(endGameMessage).toBeVisible();
    expect(yourScore).toBeVisible();
    expect(highScore).toBeVisible();
  });

  test("should call onStartNewGame when the 'Start New Game' button is clicked", () => {
    const mockStartNewGame = jest.fn();

    render(
      <Provider store={store}>
        <EndGameMessage onStartNewGame={mockStartNewGame} />
      </Provider>
    );

    const restartButton = screen.getByRole("button", {
      name: "Start New Game",
    });

    fireEvent.click(restartButton);

    expect(mockStartNewGame).toHaveBeenCalledTimes(1);
  });
});
