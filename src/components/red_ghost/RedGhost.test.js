import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import RedGhost from "./RedGhost";
import store from "../../state/store";

describe("RedGhost component", () => {
  test("should display the Red Ghost", () => {
    render(
      <Provider store={store}>
        <RedGhost />
      </Provider>
    );

    const redGhost = screen.getByTestId("redGhost");

    expect(redGhost).toBeVisible();
  });
});
