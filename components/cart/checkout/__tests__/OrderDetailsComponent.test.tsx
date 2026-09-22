import React from "react";
import { render } from "@testing-library/react-native";
import { BazarifyThemeProvider } from "@/components/design-system/theme";
import OrderDetailsComponent from "@/components/cart/checkout/OrderDetailsComponent";
import type { TCart } from "@/modules/order/schemas/orderSchema";

const item = {
  uuid: "item-1",
  name: "Travel backpack",
  sku: "bag-1",
  variant_attrs: { uuid: "variant-1", name: "Blue|Large", sku: "bag-1-blue" },
  inventory: { available_to_sell: 0, max_quantity: 2, can_increment: false },
  unit_price: 2500,
  row_discount: 100,
  row_tax: 0,
  row_shipping: 120,
  row_total: 2400,
  qty_ordered: 1,
} as unknown as NonNullable<TCart>["items"][number];

describe("OrderDetailsComponent", () => {
  it("renders blocking inventory feedback and order rows", async () => {
    const screen = await render(
      <BazarifyThemeProvider>
        <OrderDetailsComponent cart={{ items: [item], totals: {} } as TCart} />
      </BazarifyThemeProvider>,
    );

    expect(screen.getByText("Order Details")).toBeTruthy();
    expect(
      screen.getByText("Some items are no longer available."),
    ).toBeTruthy();
    expect(screen.getByText("Blue-Large")).toBeTruthy();
    expect(screen.getByText("Out of stock")).toBeTruthy();
    expect(screen.getByText("Rs. 2400")).toBeTruthy();
    expect(screen.getByText("Rs. 120")).toBeTruthy();
  });
});
