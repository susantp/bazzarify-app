import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import { SearchLauncher } from "@/components/design-system/compositions/search-launcher";
import { BazarifyThemeProvider } from "@/components/design-system/theme";

describe("SearchLauncher", () => {
  it("keeps search and back actions independent", async () => {
    const onBackPress = jest.fn();
    const onSearchPress = jest.fn();
    const screen = await render(
      <BazarifyThemeProvider>
        <SearchLauncher
          canGoBack
          onBackPress={onBackPress}
          onSearchPress={onSearchPress}
          testID="search-launcher"
        />
      </BazarifyThemeProvider>,
    );

    await fireEvent.press(screen.getByRole("button", { name: "Search" }));
    await fireEvent.press(screen.getByRole("button", { name: "Go back" }));

    expect(onSearchPress).toHaveBeenCalledTimes(1);
    expect(onBackPress).toHaveBeenCalledTimes(1);
    expect(screen.getByText("Search on")).toBeTruthy();
  });
});
