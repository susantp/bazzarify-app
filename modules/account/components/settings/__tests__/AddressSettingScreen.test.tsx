import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import { BazarifyThemeProvider } from "@/components/design-system/theme";
import AddressSettingScreen from "@/modules/account/components/settings/addressSettingScreen";

jest.mock("expo-router", () => ({
  Link: (props: any) => {
    const ReactLib = require("react");
    const { Pressable: MockPressable } = require("react-native");
    const {
      href: _href,
      asChild: _asChild,
      children,
      ...pressableProps
    } = props;
    return ReactLib.createElement(MockPressable, pressableProps, children);
  },
}));

describe("AddressSettingScreen", () => {
  it("keeps the create-address action inside the owned page boundary", async () => {
    const screen = await render(
      <BazarifyThemeProvider>
        <AddressSettingScreen />
      </BazarifyThemeProvider>,
    );

    expect(
      screen.getByRole("button", { name: "Create new address" }),
    ).toBeTruthy();
    fireEvent.press(screen.getByRole("button", { name: "Create new address" }));
  });
});
