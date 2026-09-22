import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import { BazarifyThemeProvider } from "@/components/design-system/theme";
import PaymentMethodView from "@/components/cart/payment/PaymentMethodView";

jest.mock("expo-router", () => ({
  Link: ({ children }: { children: React.ReactNode }) => children,
}));

describe("PaymentMethodView", () => {
  it("keeps the payment method label and navigates through the link", async () => {
    const screen = await render(
      <BazarifyThemeProvider>
        <PaymentMethodView
          method={{
            id: "cod",
            name: "Cash On Delivery",
            icon: "cash_on_delivery_icon",
            pathname: "/cart/paymentScreen/cod",
          }}
          pathName="/cart/paymentScreen/cod"
        />
      </BazarifyThemeProvider>,
    );

    expect(screen.getByText("Cash On Delivery")).toBeTruthy();
    expect(screen.getByRole("button")).toBeTruthy();
    fireEvent.press(screen.getByRole("button"));
  });
});
