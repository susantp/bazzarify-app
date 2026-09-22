import React from "react";
import { render } from "@testing-library/react-native";
import { MessageFeed } from "@/components/account/message/MessageFeed";

const items = [
  {
    time: "10:00 AM",
    title: "First message",
    detail: "First detail",
    imgUrl: 1,
  },
  {
    time: "11:00 AM",
    title: "Second message",
    detail: "Second detail",
    imgUrl: 1,
  },
] as const;

describe("MessageFeed", () => {
  it("renders data-driven message items with the selected feed type", async () => {
    const screen = await render(
      <MessageFeed testID="feed" items={items} type="activity" />,
    );

    expect(await screen.findByTestId("feed-item-0")).toBeTruthy();
    expect(screen.getByTestId("feed-item-1")).toBeTruthy();
    expect(screen.getByText("First message")).toBeTruthy();
    expect(screen.getByText("Second detail")).toBeTruthy();
  });
});
