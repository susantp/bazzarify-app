import React from "react";
import { act, fireEvent, render, waitFor } from "@testing-library/react-native";
import { BazarifyThemeProvider } from "@/components/design-system/theme";
import NotificationSettingScreen from "@/modules/account/components/settings/notificationsSetting";

describe("NotificationSettingScreen", () => {
  it("keeps notification preferences data-driven and updates one setting", async () => {
    const screen = await render(
      <BazarifyThemeProvider>
        <NotificationSettingScreen />
      </BazarifyThemeProvider>,
    );

    expect(screen.getByText("Promotion")).toBeTruthy();
    expect(
      screen.getByText("Be the first to discover our exclusive upcoming deals"),
    ).toBeTruthy();

    await act(async () => {
      fireEvent(screen.getAllByRole("switch")[0], "valueChange", true);
    });

    await waitFor(() => {
      expect(screen.getAllByRole("switch")[0].props.value).toBe(true);
    });
  });
});
