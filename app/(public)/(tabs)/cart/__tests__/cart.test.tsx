import React from "react";
import { render } from "@testing-library/react-native";
import { BazarifyThemeProvider } from "@/components/design-system/theme";
import CartScreen from "@/app/(public)/(tabs)/cart";

jest.mock("@/components/common/SafeAreaWrapper", () => ({
  SafeAreaWrapper: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));
jest.mock("@/components/common/ContentWrapper", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));
jest.mock("@/components/cart/CartHeader", () => ({
  __esModule: true,
  default: () => {
    const { Text } = jest.requireActual("react-native");

    return <Text>Cart header</Text>;
  },
}));
jest.mock("@/modules/core/components/BottomActionView", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));
jest.mock(
  "@/components/cart/checkout/CheckoutBottomActionView",
  () => () => null,
);
jest.mock("@/components/common/DemoModalComponent", () => () => null);
jest.mock("@/modules/user/components/DeliveryAddressPicker", () => () => null);
jest.mock("@/modules/cart/hooks/useCartHook", () => ({
  __esModule: true,
  default: () => ({
    cartState: { cart: null },
    showAddressModal: false,
    handleAddressModal: jest.fn(),
    handleCheckoutPress: jest.fn(),
  }),
}));
jest.mock("@/modules/cart/hooks/useCartCardsHook", () => ({
  __esModule: true,
  default: () => ({ CARDS: [] }),
}));

describe("CartScreen", () => {
  it("keeps the cart shell mounted for an empty cart", async () => {
    const screen = await render(
      <BazarifyThemeProvider>
        <CartScreen />
      </BazarifyThemeProvider>,
    );

    expect(screen.getByText("Cart header")).toBeTruthy();
  });
});
