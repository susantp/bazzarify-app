import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import { BazarifyThemeProvider } from "@/components/design-system/theme";
import FullWidthActionBtn from "@/components/account/FullWidthActionBtn";

describe("FullWidthActionBtn", () => {
  it("renders a labeled action and forwards presses", async () => {
    const handleOnPress = jest.fn();
    const screen = await render(
      <BazarifyThemeProvider>
        <FullWidthActionBtn
          handleOnPress={handleOnPress}
          label="Continue"
          disabled={false}
        />
      </BazarifyThemeProvider>,
    );

    fireEvent.press(screen.getByRole("button", { name: "Continue" }));
    expect(handleOnPress).toHaveBeenCalledTimes(1);
  });

  it("keeps the action disabled while a submission is in progress", async () => {
    const handleOnPress = jest.fn();
    const screen = await render(
      <BazarifyThemeProvider>
        <FullWidthActionBtn
          handleOnPress={handleOnPress}
          label="Creating account..."
          disabled
        />
      </BazarifyThemeProvider>,
    );

    const button = screen.getByRole("button", { name: "Creating account..." });
    expect(button.props.accessibilityState.disabled).toBe(true);
    fireEvent.press(button);
    expect(handleOnPress).not.toHaveBeenCalled();
  });
});
