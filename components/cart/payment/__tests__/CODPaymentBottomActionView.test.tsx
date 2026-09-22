import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import { BazarifyThemeProvider } from "@/components/design-system/theme";
import CODPaymentBottomActionView from "@/components/cart/payment/CODPaymentBottomActionView";

describe("CODPaymentBottomActionView", () => {
  it("keeps the totals, action label, and submit callback", async () => {
    const action = jest.fn();
    const screen = await render(
      <BazarifyThemeProvider>
        <CODPaymentBottomActionView
          totalPrice={500}
          cashPaymentFee={20}
          subTotalPrice={480}
          actionBtn="Confirm Order"
          action={action}
        />
      </BazarifyThemeProvider>,
    );

    expect(screen.getByText("Subtotal")).toBeTruthy();
    expect(screen.getByText("Rs. 480")).toBeTruthy();
    expect(screen.getByText("Cash Payment Fee")).toBeTruthy();
    expect(screen.getByText("Rs. 20")).toBeTruthy();
    fireEvent.press(screen.getByText("Confirm Order"));
    expect(action).toHaveBeenCalledTimes(1);
  });
});
