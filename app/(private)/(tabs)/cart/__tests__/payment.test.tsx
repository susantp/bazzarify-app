import React from "react";
import { render } from "@testing-library/react-native";
import { BazarifyThemeProvider } from "@/components/design-system/theme";
import PaymentScreen from "@/app/(private)/(tabs)/cart/payment";

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
jest.mock("@/modules/core/components/BottomActionView", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));
jest.mock("@/components/cart/payment/PaymentMethodView", () => ({
  __esModule: true,
  default: ({ method }: { method: { label: string } }) => {
    const { Text } = jest.requireActual("react-native");

    return <Text>{method.label}</Text>;
  },
}));
jest.mock("@/hooks/usePaymentScreenHook", () => ({
  __esModule: true,
  default: () => ({
    paymentMethodSections: [
      {
        sectionTitle: "Pay now",
        methods: [{ pathname: "/payment/cash", label: "Cash" }],
      },
    ],
    cartState: { cart: { totals: { sub_total: 100, grand_total: 120 } } },
    inventoryState: { hasBlockingIssue: true },
  }),
}));

describe("PaymentScreen", () => {
  it("keeps payment methods, inventory warning, and totals visible", async () => {
    const screen = await render(
      <BazarifyThemeProvider>
        <PaymentScreen />
      </BazarifyThemeProvider>,
    );

    expect(screen.getByText("Payment")).toBeTruthy();
    expect(screen.getByText("Some items became unavailable.")).toBeTruthy();
    expect(screen.getByText("Cash")).toBeTruthy();
    expect(screen.getByText("Rs. 120")).toBeTruthy();
  });
});
