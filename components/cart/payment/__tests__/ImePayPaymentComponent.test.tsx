import React from "react";
import { render } from "@testing-library/react-native";
import { BazarifyThemeProvider } from "@/components/design-system/theme";
import ImePayPaymentComponent from "@/components/cart/payment/ImePayPaymentComponent";

describe("ImePayPaymentComponent", () => {
  it("keeps the IME Pay instructions and steps visible", async () => {
    const screen = await render(
      <BazarifyThemeProvider>
        <ImePayPaymentComponent />
      </BazarifyThemeProvider>,
    );

    expect(screen.getByText(/Pay with your IME Pay Account/i)).toBeTruthy();
    expect(screen.getByText(/Login to your IME Pay account/i)).toBeTruthy();
    expect(screen.getByText(/Enter OTP/i)).toBeTruthy();
    expect(screen.getByText(/Login with your IME Pay mobile/i)).toBeTruthy();
  });
});
