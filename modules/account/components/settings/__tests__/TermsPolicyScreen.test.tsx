import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import { BazarifyThemeProvider } from "@/components/design-system/theme";
import TermsPolicyScreen from "@/modules/account/components/settings/TermsPolicyScreen";

describe("TermsPolicyScreen", () => {
  it("keeps policy tabs data-driven and switches the active content", async () => {
    const screen = await render(
      <BazarifyThemeProvider>
        <TermsPolicyScreen />
      </BazarifyThemeProvider>,
    );

    expect(screen.getByText(/Terms ipsum dolor sit amet/)).toBeTruthy();
    fireEvent.press(screen.getByTestId("terms-policy-tab-privacy"));

    await waitFor(() => {
      expect(screen.getByText(/Privacy ipsum dolor sit amet/)).toBeTruthy();
    });
  });
});
