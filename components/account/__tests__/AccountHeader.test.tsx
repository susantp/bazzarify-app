import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import { BazarifyThemeProvider } from "@/components/design-system/theme";
import AccountHeader from "@/components/account/AccountHeader";
import { router } from "expo-router";

jest.mock("expo-router", () => ({
  router: {
    canGoBack: jest.fn(() => false),
    dismissTo: jest.fn(),
    push: jest.fn(),
  },
}));

describe("AccountHeader", () => {
  it("keeps the account title and settings navigation", async () => {
    const screen = await render(
      <BazarifyThemeProvider>
        <AccountHeader />
      </BazarifyThemeProvider>,
    );

    expect(screen.getByText("Account")).toBeTruthy();
    fireEvent.press(screen.getByRole("button", { name: "Account settings" }));
    expect(router.push).toHaveBeenCalledWith({ pathname: "/account/setting" });
  });
});
