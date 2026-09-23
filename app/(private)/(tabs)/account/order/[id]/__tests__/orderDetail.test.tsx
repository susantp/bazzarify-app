import React from "react";
import { render } from "@testing-library/react-native";
import { BazarifyThemeProvider } from "@/components/design-system/theme";
import OrderDetailsPage from "@/app/(private)/(tabs)/account/order/[id]";

jest.mock("expo-router", () => ({
  useLocalSearchParams: () => ({ id: "missing" }),
  router: { push: jest.fn() },
}));
jest.mock("jotai", () => ({
  useAtomValue: () => [],
}));
jest.mock("@/modules/order/hooks/useOrder", () => ({
  __esModule: true,
  default: () => ({ ordersPayload: { orders: { data: [] } } }),
}));
jest.mock("@/modules/order/hooks/useOrderStatusBox", () => ({
  __esModule: true,
  default: () => ({ orderStatusBoxes: [] }),
}));
jest.mock("@/modules/order/atoms/orderStatusesState", () => ({
  orderStatusesState: {},
}));
jest.mock("@/components/account/order/OrderedItem", () => () => null);
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

describe("OrderDetailsPage", () => {
  it("keeps the missing-order state visible", async () => {
    const screen = await render(
      <BazarifyThemeProvider>
        <OrderDetailsPage />
      </BazarifyThemeProvider>,
    );

    expect(screen.getByText("Order Details")).toBeTruthy();
    expect(screen.getByText("Order not found.")).toBeTruthy();
  });
});
