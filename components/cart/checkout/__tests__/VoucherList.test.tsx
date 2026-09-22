import React from "react";
import { render } from "@testing-library/react-native";
import { BazarifyThemeProvider } from "@/components/design-system/theme";
import VoucherList from "@/components/cart/checkout/VoucherList";

describe("VoucherList", () => {
  it("renders the voucher section with its coupon collection", async () => {
    const screen = await render(
      <BazarifyThemeProvider>
        <VoucherList />
      </BazarifyThemeProvider>,
    );

    expect(screen.getByText("Voucher")).toBeTruthy();
    expect(screen.getAllByText("Free Shipping")).toHaveLength(3);
  });
});
