import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import { router } from "expo-router";
import { TopBarIcons } from "@/components/home/TopBar";
import { BazarifyThemeProvider } from "@/components/design-system/theme";

jest.mock("expo-router", () => ({
  router: { push: jest.fn() },
}));

describe("TopBarIcons", () => {
  it("renders owned action controls and routes to cart", async () => {
    const screen = await render(
      <BazarifyThemeProvider>
        <TopBarIcons testID="actions" />
      </BazarifyThemeProvider>,
    );

    expect(await screen.findByTestId("actions")).toBeTruthy();
    fireEvent.press(screen.getByTestId("actions-cart"));
    expect(router.push).toHaveBeenCalledWith("/cart");
  });
});
