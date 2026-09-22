import React from "react";
import { act, fireEvent, render, waitFor } from "@testing-library/react-native";
import { BazarifyThemeProvider } from "@/components/design-system/theme";
import LanguageSettingScreen from "@/modules/account/components/settings/languageScreen";

describe("LanguageSettingScreen", () => {
  it("keeps language choices data-driven and keeps one default language", async () => {
    const screen = await render(
      <BazarifyThemeProvider>
        <LanguageSettingScreen />
      </BazarifyThemeProvider>,
    );

    expect(screen.getByText("English")).toBeTruthy();
    expect(screen.getByText("Nepali")).toBeTruthy();

    await act(async () => {
      fireEvent(screen.getAllByRole("switch")[0], "valueChange", true);
    });

    await waitFor(() => {
      expect(screen.getAllByRole("switch")[0].props.value).toBe(true);
      expect(screen.getAllByRole("switch")[1].props.value).toBe(false);
    });
  });
});
