import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import { BazarifyThemeProvider } from "@/components/design-system/theme";
import OrderStatus from "@/components/account/profile/OrderStatus";
import type { ProfileMenuBoxType } from "@/modules/order/types";

const statuses: ProfileMenuBoxType[] = [
  { id: "pending", label: "Pending", status: "pending", icon: null },
  {
    id: "shipped",
    label: "Shipped",
    status: ["shipped", "partial"],
    icon: null,
  },
];

describe("OrderStatus", () => {
  it("renders aggregate counts and preserves status actions", async () => {
    const onStatusPress = jest.fn();
    const onViewAllPress = jest.fn();
    const screen = await render(
      <BazarifyThemeProvider>
        <OrderStatus
          orderStatuses={statuses}
          aggregates={{
            pending: { count: 2 },
            shipped: { count: 1 },
            partial: { count: 3 },
          }}
          onStatusPress={onStatusPress}
          onViewAllPress={onViewAllPress}
        />
      </BazarifyThemeProvider>,
    );

    expect(screen.getByText("My Orders")).toBeTruthy();
    expect(screen.getByText("2")).toBeTruthy();
    expect(screen.getByText("4")).toBeTruthy();

    await fireEvent.press(
      screen.getByRole("button", { name: "View all orders" }),
    );
    await fireEvent.press(
      screen.getByRole("button", { name: "Pending orders" }),
    );
    expect(onViewAllPress).toHaveBeenCalledTimes(1);
    expect(onStatusPress).toHaveBeenCalledWith("pending");
  });
});
