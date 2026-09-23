import React from "react";
import { render } from "@testing-library/react-native";
import { BazarifyThemeProvider } from "@/components/design-system/theme";
import OrderStatusScreen from "@/app/(private)/(tabs)/account/order/[status]";

jest.mock("expo-router", () => ({
  useLocalSearchParams: () => ({}),
  router: { replace: jest.fn() },
}));
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

describe("OrderStatusScreen", () => {
  it("keeps the missing-order fallback visible", async () => {
    const screen = await render(
      <BazarifyThemeProvider>
        <OrderStatusScreen />
      </BazarifyThemeProvider>,
    );

    expect(screen.getByText("Track Your Product")).toBeTruthy();
    expect(screen.getByText("Order id is missing.")).toBeTruthy();
  });
});
