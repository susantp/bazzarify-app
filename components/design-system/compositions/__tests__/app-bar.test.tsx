import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import { AppBar } from "@/components/design-system/compositions/app-bar";
import { BazarifyThemeProvider } from "@/components/design-system/theme";

describe("AppBar", () => {
  it("renders a title and forwards back navigation", async () => {
    const onBackPress = jest.fn();
    const screen = await render(
      <BazarifyThemeProvider>
        <AppBar
          title="Settings"
          canGoBack
          onBackPress={onBackPress}
          testID="app-bar"
        />
      </BazarifyThemeProvider>,
    );

    expect(await screen.findByText("Settings")).toBeTruthy();
    fireEvent.press(screen.getByRole("button", { name: "Go back" }));
    expect(onBackPress).toHaveBeenCalledTimes(1);
  });
});
