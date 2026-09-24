import React from "react";
import { Linking } from "react-native";
import { fireEvent, render } from "@testing-library/react-native";
import { router } from "expo-router";
import { BazarifyThemeProvider } from "@/components/design-system/theme";
import AccountProfileScreen from "@/modules/account/screens/AccountProfileScreen";

jest.mock("expo-router", () => ({
  router: { push: jest.fn() },
}));

jest.mock("@/modules/order/hooks/useOrder", () => ({
  __esModule: true,
  default: () => ({
    user: { uuid: "user-1" },
    ordersPayload: {
      orders: {
        data: [
          {
            uuid: "order-1",
            order_number: "ORD-1",
            status: "to_ship",
            placed_at: "2026-09-23T00:00:00Z",
          },
        ],
      },
    },
    orderStatusAggregated: {},
    handleStatusPress: jest.fn(),
    isRefreshing: false,
    refreshOrders: jest.fn(),
  }),
}));

jest.mock("@/modules/order/hooks/useOrderStatusBox", () => ({
  __esModule: true,
  default: () => ({ orderStatusBoxes: [] }),
}));

jest.mock("jotai", () => {
  const actual = jest.requireActual("jotai");

  return { ...actual, useAtomValue: () => [] };
});

jest.mock("@/components/account/AccountHeader", () => () => null);
jest.mock("@/components/account/profile/ProfileInfo", () => () => null);
jest.mock("@/components/account/profile/OrderStatus", () => () => null);
jest.mock("@/components/common/SafeAreaWrapper", () => ({
  SafeAreaWrapper: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

describe("AccountProfileScreen", () => {
  it("keeps recent-order and earn actions accessible", async () => {
    const openURL = jest.spyOn(Linking, "openURL").mockResolvedValue(true);
    const screen = await render(
      <BazarifyThemeProvider>
        <AccountProfileScreen />
      </BazarifyThemeProvider>,
    );

    await fireEvent.press(screen.getByRole("button", { name: "ORD-1" }));
    expect(router.push).toHaveBeenCalledWith({
      pathname: "/account/order/[id]",
      params: { id: "order-1" },
    });

    await fireEvent.press(
      screen.getByRole("button", { name: "Earn With Bazzarify" }),
    );
    expect(openURL).toHaveBeenCalledWith(
      "https://vendor.bazarify.com.np/register",
    );
    openURL.mockRestore();
  });
});
