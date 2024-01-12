import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../state/store";
import SandwichPoints from "./SandwichPoints";

describe("SandwichPoints component", () => {
  test("should display the sandwich points", () => {
    render(
      <Provider store={store}>
        <SandwichPoints />
      </Provider>
    );

    const sandwich = screen.getByTestId("sandwichPoints");
    const sandwichesEaten = screen.getByText("0 sandwiches eaten");

    expect(sandwich).toBeVisible();
    expect(sandwichesEaten).toBeVisible();
  });
});
