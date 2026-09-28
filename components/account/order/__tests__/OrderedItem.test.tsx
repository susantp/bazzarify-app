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

  it("shows item refund progress from the buyer order payload", async () => {
    const orderData = {
      uuid: "order-2",
      order_number: "1002",
      placed_at: "2025-01-01T00:00:00.000Z",
      items: [
        {
          order_uuid: "order-2",
          name: "Face Wash",
          qty_refunded: 1,
          refund_cases: [
            {
              uuid: "refund-1",
              requested_quantity: 1,
              amount_minor: 1200,
              status: "returned",
              reason: "Damaged",
              created_at: "2025-01-01T00:00:00.000Z",
              decision_at: "2025-01-01T01:00:00.000Z",
              returned_at: "2025-01-01T02:00:00.000Z",
            },
          ],
        },
      ],
    };

    const screen = await render(
      <BazarifyThemeProvider>
        <OrderedItem
          order={orderData as never}
          item={orderData.items[0] as never}
          statusItem={undefined}
        />
      </BazarifyThemeProvider>,
    );

    expect(screen.getByText("Refunded quantity: 1")).toBeTruthy();
    expect(screen.getByText("Refund returned · 1 item")).toBeTruthy();
  });
});
