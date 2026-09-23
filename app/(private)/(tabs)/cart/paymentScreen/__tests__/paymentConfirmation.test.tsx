import React from "react";
import { render } from "@testing-library/react-native";
import { BazarifyThemeProvider } from "@/components/design-system/theme";
import PaymentConfirmationScreen from "@/app/(private)/(tabs)/cart/paymentScreen/[id]";

jest.mock("expo-router", () => ({
  useLocalSearchParams: () => ({ id: "cash" }),
}));
jest.mock("@/components/common/SafeAreaWrapper", () => ({
  SafeAreaWrapper: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));
jest.mock("@/components/common/ScreenHeader", () => ({
  __esModule: true,
  default: ({ title }: { title?: string }) => {
    const { Text } = jest.requireActual("react-native");

    return <Text>{title}</Text>;
  },
}));
jest.mock("@/hooks/usePaymentScreenHook", () => ({
  __esModule: true,
  default: () => {
    const { Text } = require("react-native");

    return {
      paymentMethodById: {
        name: "Cash on delivery",
        voucherMsg: "Bring the exact amount when your order arrives.",
      },
      componentMap: {
        cash: <Text>Payment form</Text>,
      },
    };
  },
}));

describe("PaymentConfirmationScreen", () => {
  it("keeps the payment message and method content visible", async () => {
    const screen = await render(
      <BazarifyThemeProvider>
        <PaymentConfirmationScreen />
      </BazarifyThemeProvider>,
    );

    expect(screen.getByText("Cash on delivery")).toBeTruthy();
    expect(
      screen.getByText("Bring the exact amount when your order arrives."),
    ).toBeTruthy();
    expect(screen.getByText("Payment form")).toBeTruthy();
  });
});
