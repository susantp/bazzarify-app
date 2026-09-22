import React from "react";
import { render } from "@testing-library/react-native";
import { BazarifyThemeProvider } from "@/components/design-system/theme";
import OrderItem from "@/components/cart/checkout/OrderItem";
import type { TCartItem } from "@/modules/order/schemas/orderSchema";

const item = {
  uuid: "item-1",
  name: "Travel backpack",
  sku: "bag-1",
  variant_attrs: null,
  inventory: null,
  unit_price: 2500,
  row_discount: 0,
  row_tax: 0,
  row_shipping: 0,
  row_total: 2500,
  qty_ordered: 2,
} as unknown as TCartItem;

describe("OrderItem", () => {
  it("renders checkout item summary and quantity", async () => {
    const screen = await render(
      <BazarifyThemeProvider>
        <OrderItem items={[item]} />
      </BazarifyThemeProvider>,
    );

    expect(screen.getByText("Travel backpack")).toBeTruthy();
    expect(screen.getByText("item.vendor")).toBeTruthy();
    expect(screen.getByText("2500")).toBeTruthy();
    expect(screen.getByText("x 2")).toBeTruthy();
  });
});
