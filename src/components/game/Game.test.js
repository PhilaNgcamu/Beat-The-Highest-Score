import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import Game from "./Game";
import store from "../../state/store";
import { act } from "react-dom/test-utils";
import {
  setPlayerPosition,
  setRedGhostPosition,
  setTimer,
} from "../../state/actions";

let gameComponent;

beforeAll(() => {
  gameComponent = (
    <Provider store={store}>
      <Game />
    </Provider>
  );
});

describe("Game Component", () => {
  test("should start the game after clicking the 'Start Game' button", () => {
    render(gameComponent);

    const gameTitle = screen.getByText("Beat The Highest Score");

    expect(gameTitle).toBeVisible();

    fireEvent.click(screen.getByRole("button", { name: "Start Game" }));

    expect(gameTitle).not.toBeVisible();
  });

  test("should move player 30px up when 'ArrowUp' key is pressed and restart the game to expect th player to be in an initial top position", () => {
    render(gameComponent);

    const player = screen.getByTestId("player");

    expect(player.style.top).toBe("145px");

    fireEvent.keyDown(window, { key: "ArrowUp" });

    expect(player.style.top).toBe("115px");

    const restartButton = screen.getByRole("button", { name: "Restart Game" });
    fireEvent.click(restartButton);

    expect(player.style.top).toBe("145px");
  });

  test("should move player 30px to the right when 'ArrowRight' key is pressed", () => {
    render(gameComponent);

    const player = screen.getByTestId("player");

    expect(player.style.left).toBe("145px");

    fireEvent.keyDown(window, { key: "ArrowRight" });

    expect(player.style.left).toBe("175px");
  });

  test("should move player 30px down when 'ArrowDown' key is pressed", () => {
    render(gameComponent);

    const player = screen.getByTestId("player");

    expect(player.style.top).toBe("145px");

    fireEvent.keyDown(window, { key: "ArrowDown" });

    expect(player.style.top).toBe("175px");
  });

  test("should move player 30px to the left when 'ArrowLeft' key is pressed", () => {
    render(gameComponent);

    const player = screen.getByTestId("player");

    expect(player.style.left).toBe("175px");

    fireEvent.keyDown(window, { key: "ArrowLeft" });

    expect(player.style.left).toBe("145px");
  });

  test("should move player to eat the sandwich. Display the time taken and increment the sandwiches eaten", async () => {
    render(gameComponent);

    const initialScore = screen.getByText("0 sandwiches eaten");
    expect(initialScore).toBeVisible();

    const fireMultipleKeyEvents = (keys) => {
      keys.forEach((key) => {
        fireEvent.keyDown(window, { key });
      });
    };

    act(() => {
      store.dispatch(setTimer(15));
    });

    const movements = [
      "ArrowUp",
      "ArrowUp",
      "ArrowUp",
      "ArrowUp",
      "ArrowUp",
      "ArrowLeft",
      "ArrowLeft",
      "ArrowLeft",
      "ArrowLeft",
    ];
    fireMultipleKeyEvents(movements);

    const updatedScore = screen.getByText("1 sandwiches eaten");
    expect(updatedScore).toBeVisible();

    const updatedTimer = screen.getByText("15 seconds");
    expect(updatedTimer).toBeVisible();
  });

  test("should end the game when the timer runs out and display the game over message", () => {
    render(gameComponent);

    act(() => {
      store.dispatch(setTimer(0));
    });

    const gameOverMessage = screen.getByText(
      "Congratulations! You beat the highest score!"
    );
    expect(gameOverMessage).toBeVisible();
  });

  test("should end the game when Red Ghost kills the player and display the game over message", () => {
    render(gameComponent);

    const startNewGameButton = screen.getByRole("button", {
      name: "Start New Game",
    });

    fireEvent.click(startNewGameButton);

    act(() => {
      store.dispatch(setPlayerPosition({ top: 150, left: 150 }));
      store.dispatch(setRedGhostPosition({ top: 155, left: 155 }));
    });

    const gameOverMessage = screen.getByText(
      "You didn't beat the highest score. Try again!"
    );
    expect(gameOverMessage).toBeVisible();
  });
});
