import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import { BazarifyThemeProvider } from "@/components/design-system/theme";
import CartHeader from "@/components/cart/CartHeader";

jest.mock("expo-router", () => ({
  router: {
    canGoBack: jest.fn(() => false),
    dismissTo: jest.fn(),
    back: jest.fn(),
  },
}));

describe("CartHeader", () => {
  it("keeps the cart title and forwards address selection", async () => {
    const onAddressButtonPress = jest.fn();
    const screen = await render(
      <BazarifyThemeProvider>
        <CartHeader onAddressButtonPress={onAddressButtonPress} />
      </BazarifyThemeProvider>,
    );

    expect(screen.getByText("My Cart")).toBeTruthy();
    fireEvent.press(
      screen.getByRole("button", { name: "Choose delivery address" }),
    );
    expect(onAddressButtonPress).toHaveBeenCalledTimes(1);
  });
});
