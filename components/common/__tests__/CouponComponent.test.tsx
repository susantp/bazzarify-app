import React from "react";
import { render } from "@testing-library/react-native";
import { BazarifyThemeProvider } from "@/components/design-system/theme";
import ShippingCoupon from "@/components/common/CouponComponent";

describe("ShippingCoupon", () => {
  it("renders the data shown in the shipping coupon card", async () => {
    const screen = await render(
      <BazarifyThemeProvider>
        <ShippingCoupon />
      </BazarifyThemeProvider>,
    );

    expect(screen.getByText("Rs. 130")).toBeTruthy();
    expect(screen.getByText("Min. Spend Rs. 799")).toBeTruthy();
    expect(screen.getByText("Free Shipping")).toBeTruthy();
    expect(screen.getByText("Selected sellers")).toBeTruthy();
    expect(screen.getByText("Collect")).toBeTruthy();
  });
});
