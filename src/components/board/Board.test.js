import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../state/store";
import Board from "./Board";

describe("Board component", () => {
  test("should display the board", () => {
    render(
      <Provider store={store}>
        <Board />
      </Provider>
    );

    const board = screen.getByTestId("board");

    expect(board).toBeVisible();
  });
});
