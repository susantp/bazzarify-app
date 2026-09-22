import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import { BazarifyThemeProvider } from "@/components/design-system/theme";
import CheckoutBottomActionView from "@/components/cart/checkout/CheckoutBottomActionView";

describe("CheckoutBottomActionView", () => {
  it("renders totals and forwards the checkout action", async () => {
    const handlePress = jest.fn();
    const screen = await render(
      <BazarifyThemeProvider>
        <CheckoutBottomActionView
          totalPrice={2400}
          deliveryPrice={100}
          btnLabel="Place order"
          handlePress={handlePress}
        />
      </BazarifyThemeProvider>,
    );

    expect(screen.getByText(/Total:/)).toBeTruthy();
    expect(screen.getByText(/Rs\. 2400/)).toBeTruthy();
    expect(screen.getByText(/Delivery fee:/)).toBeTruthy();
    fireEvent.press(screen.getByRole("button", { name: "Place order" }));
    expect(handlePress).toHaveBeenCalledTimes(1);
  });

  it("exposes disabled state and helper feedback", async () => {
    const handlePress = jest.fn();
    const screen = await render(
      <BazarifyThemeProvider>
        <CheckoutBottomActionView
          totalPrice={2400}
          btnLabel="Place order"
          handlePress={handlePress}
          disabled
          helperText="Select a delivery address first"
        />
      </BazarifyThemeProvider>,
    );

    const button = screen.getByRole("button", { name: "Place order" });
    expect(button.props.accessibilityState.disabled).toBe(true);
    expect(screen.getByText("Select a delivery address first")).toBeTruthy();
    fireEvent.press(button);
    expect(handlePress).not.toHaveBeenCalled();
  });
});
