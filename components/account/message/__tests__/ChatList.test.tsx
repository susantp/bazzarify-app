import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import { BazarifyThemeProvider } from "@/components/design-system/theme";
import {
  ChatList,
  type ChatListItemData,
} from "@/components/account/message/ChatList";

const items: readonly ChatListItemData[] = [
  { id: "one", title: "Dell", body: "Available?", iconSource: 1 },
  { id: "two", title: "Apple", body: "In stock?", iconSource: 1 },
];

describe("ChatList", () => {
  it("renders typed chat data and forwards item selection", async () => {
    const onItemPress = jest.fn();
    const screen = await render(
      <BazarifyThemeProvider>
        <ChatList testID="chat-list" items={items} onItemPress={onItemPress} />
      </BazarifyThemeProvider>,
    );

    expect(await screen.findByText("Dell")).toBeTruthy();
    expect(screen.getByText("In stock?")).toBeTruthy();
    fireEvent.press(screen.getByTestId("chat-list-item-0"));
    expect(onItemPress).toHaveBeenCalledWith(items[0]);
  });
});
