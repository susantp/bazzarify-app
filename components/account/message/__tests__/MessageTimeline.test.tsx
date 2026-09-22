import React from "react";
import { render } from "@testing-library/react-native";
import { BazarifyThemeProvider } from "@/components/design-system/theme";
import { MessageTimeline } from "@/components/account/message/MessageTimeline";

const items = [
  {
    type: "promo" as const,
    time: "10:00 AM",
    title: "Promotion",
    detail: "Promotion detail",
    imgUrl: 1,
  },
  {
    type: "activity" as const,
    time: "11:00 AM",
    title: "Activity",
    detail: "Activity detail",
    imgUrl: 1,
  },
];

describe("MessageTimeline", () => {
  it("renders mixed message types from one data contract", async () => {
    const screen = await render(
      <BazarifyThemeProvider>
        <MessageTimeline testID="timeline" items={items} />
      </BazarifyThemeProvider>,
    );

    expect(await screen.findByTestId("timeline-item-0")).toBeTruthy();
    expect(screen.getByTestId("timeline-item-1")).toBeTruthy();
    expect(screen.getByText("Promotion detail")).toBeTruthy();
    expect(screen.getByText("Activity detail")).toBeTruthy();
  });
});
