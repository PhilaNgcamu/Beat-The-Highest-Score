import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../state/store";
import Sandwich from "./Sandwich";

describe("Sandwich component", () => {
  test("should display the sandwich", () => {
    render(
      <Provider store={store}>
        <Sandwich />
      </Provider>
    );

    const sandwich = screen.getByTestId("sandwich");

    expect(sandwich).toBeVisible();
  });
});
