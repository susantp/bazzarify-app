import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import { SearchAppBar } from "@/components/design-system/compositions/search-app-bar";
import { BazarifyThemeProvider } from "@/components/design-system/theme";

describe("SearchAppBar", () => {
  it("keeps search input and back interaction data-driven", async () => {
    const onBackPress = jest.fn();
    const onChangeText = jest.fn();
    const onSubmitEditing = jest.fn();
    const screen = await render(
      <BazarifyThemeProvider>
        <SearchAppBar
          canGoBack
          onBackPress={onBackPress}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmitEditing}
          placeholder="Search products"
          testID="search-bar"
        />
      </BazarifyThemeProvider>,
    );

    const input = screen.getByPlaceholderText("Search products");
    await fireEvent.changeText(input, "hoodie");
    await fireEvent(input, "submitEditing");
    await fireEvent.press(screen.getByRole("button", { name: "Go back" }));

    expect(onChangeText).toHaveBeenCalledWith("hoodie");
    expect(onSubmitEditing).toHaveBeenCalledTimes(1);
    expect(onBackPress).toHaveBeenCalledTimes(1);
  });
});
