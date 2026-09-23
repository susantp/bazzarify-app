import React from "react";
import { View } from "react-native";
import { render } from "@testing-library/react-native";
import { BazarifyThemeProvider } from "@/components/design-system/theme";
import useCartCardsHook from "@/modules/cart/hooks/useCartCardsHook";

jest.mock("@/modules/cart/hooks/useCartHook", () => ({
  __esModule: true,
  default: () => ({
    cartState: { cart: { totals: { items_count: 0 }, items: [] } },
    handleLineItemRemove: jest.fn(),
    handleLineItemDecrement: jest.fn(),
    handleLineItemIncrement: jest.fn(),
    getLineItemIncrementDisabled: jest.fn(() => false),
  }),
}));

function CartCardsHarness() {
  const { CARDS } = useCartCardsHook();

  return (
    <View>
      {CARDS.map(({ title, component }) => (
        <View key={title}>{component}</View>
      ))}
    </View>
  );
}

describe("useCartCardsHook", () => {
  it("keeps an owned empty-cart message when the cart has no items", async () => {
    const screen = await render(
      <BazarifyThemeProvider>
        <CartCardsHarness />
      </BazarifyThemeProvider>,
    );

    expect(screen.getByText("No Items on cart")).toBeTruthy();
  });
});
