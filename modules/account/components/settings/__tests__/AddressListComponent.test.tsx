import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import { BazarifyThemeProvider } from "@/components/design-system/theme";
import AddressListComponent from "@/modules/account/components/settings/AddressListComponent";
import type { TUserAddress } from "@/modules/user/schemas/UserAddress";

jest.mock("expo-router", () => ({
  Link: (props: any) => {
    const ReactLib = require("react");
    const { Pressable: MockPressable } = require("react-native");
    const { href: _href, children, ...pressableProps } = props;
    return ReactLib.createElement(MockPressable, pressableProps, children);
  },
}));

const address = {
  uuid: "11111111-1111-4111-8111-111111111111",
  street: "Market Street",
  city: "Kathmandu",
  state: "Bagmati",
  zip: "44600",
  country: "Nepal",
  phone: "9800000000",
  user_uuid: "22222222-2222-4222-8222-222222222222",
  is_default: true,
} satisfies TUserAddress;

describe("AddressListComponent", () => {
  it("keeps address summaries, edit routes, and switch payloads data-driven", async () => {
    const onSwitchChange = jest.fn();
    const screen = await render(
      <BazarifyThemeProvider>
        <AddressListComponent
          addresses={[address]}
          onSwitchChange={onSwitchChange}
        />
      </BazarifyThemeProvider>,
    );

    expect(screen.getByText("Market Street, Kathmandu, Bagmati")).toBeTruthy();
    expect(screen.getByText("Edit")).toBeTruthy();

    fireEvent(screen.getByRole("switch"), "valueChange", false);
    expect(onSwitchChange).toHaveBeenCalledWith({
      ...address,
      is_default: false,
    });
  });
});
