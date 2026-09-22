import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import { BazarifyThemeProvider } from "@/components/design-system/theme";
import CartItem from "@/components/cart/CartItem";
import type { TCartItem } from "@/modules/order/schemas/orderSchema";

const item = {
  uuid: "item-1",
  name: "Travel backpack",
  sku: "bag-1",
  variant_attrs: { uuid: "variant-1", name: "Blue|Large", sku: "bag-1-blue" },
  inventory: { available_to_sell: 2, max_quantity: 4, can_increment: true },
  unit_price: 2500,
  row_discount: 100,
  row_tax: 0,
  row_shipping: 0,
  row_total: 2400,
  qty_ordered: 1,
} as unknown as TCartItem;

describe("CartItem", () => {
  it("keeps variant, inventory, price, and quantity actions", async () => {
    const handlers = {
      onIncrement: jest.fn(),
      onDecrement: jest.fn(),
      onRemove: jest.fn(),
    };
    const screen = await render(
      <BazarifyThemeProvider>
        <CartItem item={item} {...handlers} />
      </BazarifyThemeProvider>,
    );

    expect(screen.getByText("Travel backpack")).toBeTruthy();
    expect(screen.getByText("Blue-Large")).toBeTruthy();
    expect(screen.getByText("2 item(s) available")).toBeTruthy();
    expect(screen.getByText("Rs 2500")).toBeTruthy();

    await fireEvent.press(
      screen.getByRole("button", { name: "Remove Travel backpack" }),
    );
    await fireEvent.press(
      screen.getByRole("button", { name: "Increase Travel backpack" }),
    );
    await fireEvent.press(
      screen.getByRole("button", { name: "Decrease Travel backpack" }),
    );
    expect(handlers.onRemove).toHaveBeenCalledTimes(1);
    expect(handlers.onIncrement).toHaveBeenCalledTimes(1);
    expect(handlers.onDecrement).toHaveBeenCalledTimes(1);
  });
});
