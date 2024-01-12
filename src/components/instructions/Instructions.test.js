import { render, screen, fireEvent } from "@testing-library/react";
import Instructions from "./Instructions";
import instructionsObj from "./instructionsObj";

describe("Instructions component", () => {
  test("should display the instructions of the game", () => {
    render(<Instructions />);

    const instructions = screen.getByTestId("instructions");
    const gameTitle = screen.getByText(instructionsObj.gameTitle);
    const directionInstruction = screen.getByText(
      instructionsObj.directionInstruction
    );
    const warningInstruction = screen.getByText(
      instructionsObj.warningInstruction
    );
    const tipInstruction = screen.getByText(instructionsObj.tipInstruction);
    const startGameInstruction = screen.getByText(
      instructionsObj.startGameInstruction
    );

    expect(instructions).toBeVisible();
    expect(gameTitle).toBeVisible();
    expect(directionInstruction).toBeVisible();
    expect(warningInstruction).toBeVisible();
    expect(tipInstruction).toBeVisible();
    expect(startGameInstruction).toBeVisible();
  });

  test("should mock the 'Start Game' button", () => {
    const startGameMock = jest.fn();

    render(<Instructions startGame={startGameMock} />);

    const startGameButton = screen.getByRole("button", { name: "Start Game" });

    fireEvent.click(startGameButton);
    expect(startGameMock).toHaveBeenCalledTimes(1);
  });
});
