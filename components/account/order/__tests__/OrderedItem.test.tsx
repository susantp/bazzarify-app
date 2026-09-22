import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import { BazarifyThemeProvider } from "@/components/design-system/theme";
import OrderedItem from "@/components/account/order/OrderedItem";
import { router } from "expo-router";

jest.mock("expo-router", () => ({
  router: { push: jest.fn() },
}));

describe("OrderedItem", () => {
  it("keeps order details and action routing data-driven", async () => {
    const orderData = {
      uuid: "order-1",
      order_number: "1001",
      placed_at: "2025-01-01T00:00:00.000Z",
      items: [{ order_uuid: "order-1", name: "Face Wash" }],
    };
    const order = orderData as never;

    const screen = await render(
      <BazarifyThemeProvider>
        <OrderedItem
          order={order}
          item={orderData.items[0] as never}
          statusItem={
            {
              action: { label: "Track", route: "/account/order/[id]/tracking" },
            } as never
          }
        />
      </BazarifyThemeProvider>,
    );

    expect(screen.getByText("Face Wash")).toBeTruthy();
    fireEvent.press(screen.getByRole("button", { name: "Track" }));
    expect(router.push).toHaveBeenCalledWith({
      pathname: "/account/order/[id]/tracking",
      params: { id: "1001" },
    });
  });
});
