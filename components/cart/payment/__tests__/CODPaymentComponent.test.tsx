import React from "react";
import { render } from "@testing-library/react-native";
import { BazarifyThemeProvider } from "@/components/design-system/theme";
import CODPaymentComponent from "@/components/cart/payment/CODPaymentComponent";

describe("CODPaymentComponent", () => {
  it("keeps the cash-on-delivery instructions visible", async () => {
    const screen = await render(
      <BazarifyThemeProvider>
        <CODPaymentComponent />
      </BazarifyThemeProvider>,
    );

    expect(screen.getByText(/pay in cash/i)).toBeTruthy();
    expect(screen.getByText(/delivery status/i)).toBeTruthy();
    expect(screen.getByText(/airway bill/i)).toBeTruthy();
    expect(screen.getByText(/order number/i)).toBeTruthy();
  });
});
