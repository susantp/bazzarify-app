import React from "react";
import { render } from "@testing-library/react-native";
import { BazarifyThemeProvider } from "@/components/design-system/theme";
import ImePayPaymentBottomActionView from "@/components/cart/payment/ImePayPaymentBottomActionView";

describe("ImePayPaymentBottomActionView", () => {
  it("keeps the subtotal, total, and action label visible", async () => {
    const screen = await render(
      <BazarifyThemeProvider>
        <ImePayPaymentBottomActionView
          totalPrice={450}
          subTotalPrice={400}
          actionBtn="Confirm Order"
        />
      </BazarifyThemeProvider>,
    );

    expect(screen.getByText("Subtotal")).toBeTruthy();
    expect(screen.getByText("Rs. 400")).toBeTruthy();
    expect(screen.getByText("Total Amount")).toBeTruthy();
    expect(screen.getByText("Rs. 450")).toBeTruthy();
    expect(screen.getByText("Confirm Order")).toBeTruthy();
  });
});
