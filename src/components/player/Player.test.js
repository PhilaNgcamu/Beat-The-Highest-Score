import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import Player from "./Player";
import store from "../../state/store";

describe("Player component", () => {
  test("should display the player", () => {
    render(
      <Provider store={store}>
        <Player />
      </Provider>
    );

    const player = screen.getByTestId("player");

    expect(player).toBeVisible();
  });
});
