import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import { BazarifyThemeProvider } from "@/components/design-system/theme";
import { Text } from "@/components/design-system";
import DemoModalComponent from "@/components/common/DemoModalComponent";

describe("DemoModalComponent", () => {
  it("renders bottom content and exposes a labelled close action", async () => {
    const handlePress = jest.fn();
    const screen = await render(
      <BazarifyThemeProvider>
        <DemoModalComponent type="bottom" showModal handlePress={handlePress}>
          <Text>Modal content</Text>
        </DemoModalComponent>
      </BazarifyThemeProvider>,
    );

    expect(screen.getByText("Modal content")).toBeTruthy();
    fireEvent.press(screen.getByRole("button", { name: "Close modal" }));
    expect(handlePress).toHaveBeenCalledTimes(1);
  });
});
