import React from "react";
import { render } from "@testing-library/react-native";
import { BazarifyThemeProvider } from "@/components/design-system/theme";
import DeliveryMileStones from "@/components/account/order/DeliveryMileStones";
import TimelineItem from "@/components/account/order/TimelineItem";

describe("order tracking visuals", () => {
  it("renders an inactive timeline item with its status details", async () => {
    const screen = await render(
      <BazarifyThemeProvider>
        <TimelineItem
          item={{
            active: false,
            status: "Shipped",
            description: "Package left the warehouse",
            date: "Today",
          }}
        />
      </BazarifyThemeProvider>,
    );

    expect(screen.getByText("Shipped")).toBeTruthy();
    expect(screen.getByText("Package left the warehouse")).toBeTruthy();
    expect(screen.getByText("Today")).toBeTruthy();
  });

  it("keeps the four delivery milestones for a shipped order", async () => {
    const screen = await render(
      <BazarifyThemeProvider>
        <DeliveryMileStones currentStatus="shipped" />
      </BazarifyThemeProvider>,
    );

    expect(screen.getByText("Processing")).toBeTruthy();
    expect(screen.getByText("Packed")).toBeTruthy();
    expect(screen.getByText("Shipped")).toBeTruthy();
    expect(screen.getByText("Delivered")).toBeTruthy();
  });
});
