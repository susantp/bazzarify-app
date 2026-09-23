import React from "react";
import { render } from "@testing-library/react-native";
import { BazarifyThemeProvider } from "@/components/design-system/theme";
import OrderListPage from "@/app/(private)/(tabs)/account/order";

jest.mock("expo-router", () => ({
  useLocalSearchParams: () => ({}),
  router: { replace: jest.fn(), push: jest.fn() },
}));
jest.mock("jotai", () => ({ useAtomValue: () => [] }));
jest.mock("@/modules/order/atoms/orderStatusesState", () => ({
  orderStatusesState: {},
}));
jest.mock("@/modules/order/hooks/useOrderStatusBox", () => ({
  __esModule: true,
  default: () => ({
    orderStatusBoxes: [
      { id: "all", label: "All orders", status: null },
      { id: "pending", label: "Pending", status: "PENDING" },
    ],
  }),
}));
jest.mock("@/modules/order/hooks/useOrder", () => ({
  __esModule: true,
  default: () => ({
    getFilteredOrder: () => [],
    isRefreshing: false,
    refreshOrders: jest.fn(),
  }),
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

describe("OrderListPage", () => {
  it("keeps status filters and the empty-order state visible", async () => {
    const screen = await render(
      <BazarifyThemeProvider>
        <OrderListPage />
      </BazarifyThemeProvider>,
    );

    expect(screen.getByText("Your Order")).toBeTruthy();
    expect(screen.getByText("All orders")).toBeTruthy();
    expect(screen.getByText("No orders found.")).toBeTruthy();
  });
});
