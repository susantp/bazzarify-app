import React from "react";
import { render } from "@testing-library/react-native";
import { BazarifyThemeProvider } from "@/components/design-system/theme";
import CheckoutScreen from "@/app/(private)/(tabs)/cart/checkout";

jest.mock("@/components/common/SafeAreaWrapper", () => ({
  SafeAreaWrapper: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));
jest.mock("@/components/common/ScreenHeader", () => ({
  __esModule: true,
  default: ({ title }: { title: string }) => {
    const { Text } = jest.requireActual("react-native");

    return <Text>{title}</Text>;
  },
}));
jest.mock(
  "@/components/cart/checkout/CheckoutBottomActionView",
  () => () => null,
);
jest.mock("@/modules/core/components/BottomActionView", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));
jest.mock("@/modules/checkout/hooks/useCheckoutScreenHook", () => ({
  __esModule: true,
  default: () => ({
    btnLabel: "Continue",
    CARDS: [],
    handleCheckout: jest.fn(),
    cartState: { cart: { items: [] } },
    inventoryState: { hasBlockingIssue: false },
  }),
}));

describe("CheckoutScreen", () => {
  it("keeps the checkout surface mounted when the cart is empty", async () => {
    const screen = await render(
      <BazarifyThemeProvider>
        <CheckoutScreen />
      </BazarifyThemeProvider>,
    );

    expect(screen.getByText("Checkout")).toBeTruthy();
  });
});
