import React from "react";
import { act, fireEvent, render, waitFor } from "@testing-library/react-native";
import { BazarifyThemeProvider } from "@/components/design-system/theme";
import PermissionSettingScreen from "@/modules/account/components/settings/permissionSetting";

describe("PermissionSettingScreen", () => {
  it("keeps permission choices data-driven and updates a permission", async () => {
    const screen = await render(
      <BazarifyThemeProvider>
        <PermissionSettingScreen />
      </BazarifyThemeProvider>,
    );

    expect(screen.getByText("Allow to access microphone")).toBeTruthy();
    expect(screen.getByText("Allow to access location")).toBeTruthy();

    await act(async () => {
      fireEvent(screen.getAllByRole("switch")[0], "valueChange", true);
    });

    await waitFor(() => {
      expect(screen.getAllByRole("switch")[0].props.value).toBe(true);
    });
  });
});
