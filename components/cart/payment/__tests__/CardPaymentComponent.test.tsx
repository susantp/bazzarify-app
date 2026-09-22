import React from "react";
import { render } from "@testing-library/react-native";
import { BazarifyThemeProvider } from "@/components/design-system/theme";
import CardPaymentComponent from "@/components/cart/payment/CardPaymentComponent";

describe("CardPaymentComponent", () => {
  it("keeps the card payment fields available", async () => {
    const screen = await render(
      <BazarifyThemeProvider>
        <CardPaymentComponent />
      </BazarifyThemeProvider>,
    );

    expect(screen.getByPlaceholderText("Card number")).toBeTruthy();
    expect(screen.getByPlaceholderText("MM/YY")).toBeTruthy();
    expect(screen.getByPlaceholderText("CVV")).toBeTruthy();
    expect(screen.getByPlaceholderText("Name on card")).toBeTruthy();
  });
});
