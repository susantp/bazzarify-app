import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import { BazarifyThemeProvider } from "@/components/design-system/theme";
import { Button, Input, Select } from "@/components/design-system/controls";
import { Text } from "@/components/design-system/primitives";

async function renderWithTheme(ui: React.ReactElement) {
  return render(<BazarifyThemeProvider>{ui}</BazarifyThemeProvider>);
}

describe("Bazarify design-system primitives", () => {
  it("renders token-backed text and a button interaction", async () => {
    const onPress = jest.fn();
    const screen = await renderWithTheme(
      <>
        <Text variant="heading">Product</Text>
        <Button label="Continue" onPress={onPress} testID="continue" />
      </>,
    );

    expect(screen.getByText("Product")).toBeTruthy();
    fireEvent.press(screen.getByTestId("continue"));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("surfaces input and select validation contracts", async () => {
    const onPress = jest.fn();
    const screen = await renderWithTheme(
      <>
        <Input label="Name" error="Name is required" />
        <Select label="Category" error="Choose a category" onPress={onPress} />
      </>,
    );

    expect(screen.getByText("Name is required")).toBeTruthy();
    expect(screen.getByText("Choose a category")).toBeTruthy();
    fireEvent.press(screen.getByRole("button", { name: "Category" }));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("does not invoke a disabled button", async () => {
    const onPress = jest.fn();
    const screen = await renderWithTheme(
      <Button label="Save" disabled onPress={onPress} testID="save" />,
    );

    fireEvent.press(screen.getByTestId("save"));
    expect(onPress).not.toHaveBeenCalled();
  });
});
